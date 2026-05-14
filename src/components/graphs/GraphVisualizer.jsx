import { useState, useMemo, useCallback } from "react";
import { GraphCanvas } from "./GraphCanvas";
import { GraphControls } from "./GraphControls";
import { GraphStepDescription } from "./GraphStepDescription";
import { DijkstraTable } from "./DijkstraTable";
import { useGraphAnimation } from "../../hooks/useGraphAnimation";
import { generateGraph } from "../../utils/generateGraph";
import { bfs } from "../../algorithms/graphs/bfs";
import { dfs } from "../../algorithms/graphs/dfs";
import { dijkstra } from "../../algorithms/graphs/dijkstra";

const GRAPH_ALGOS = { bfs, dfs, dijkstra };

export function GraphVisualizer() {
  const [algorithm, setAlgorithm] = useState("bfs");
  const [nodeCount, setNodeCount] = useState(10);
  const [startNode, setStartNode] = useState(0);
  const [graph, setGraph] = useState(() => generateGraph(10));

  const steps = useMemo(
    () => GRAPH_ALGOS[algorithm](graph, startNode),
    [algorithm, graph, startNode],
  );

  const {
    step,
    isPlaying,
    isFinished,
    speed,
    currentStep,
    totalSteps,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    setSpeed,
  } = useGraphAnimation(steps);

  const handleGenerateGraph = useCallback(() => {
    setGraph(generateGraph(nodeCount));
  }, [nodeCount]);

  const handleNodeCountChange = useCallback((count) => {
    setNodeCount(count);
    setGraph(generateGraph(count));
    setStartNode(0);
  }, []);

  const handleAlgorithmChange = useCallback((alg) => {
    setAlgorithm(alg);
  }, []);

  return (
    <div className="graph-visualizer">
      <div className="graph-layout">
        {/* Canvas SVG */}
        <div className="graph-canvas-wrapper">
          <GraphCanvas graph={graph} step={step} />

          {/* Tabela do Dijkstra fica sobreposta ao canvas em telas largas */}
          {algorithm === "dijkstra" && (
            <DijkstraTable step={step} graph={graph} />
          )}
        </div>

        {/* Sidebar: controles + painel pedagógico */}
        <div className="graph-sidebar">
          <GraphControls
            algorithm={algorithm}
            onAlgorithmChange={handleAlgorithmChange}
            startNode={startNode}
            onStartNodeChange={setStartNode}
            nodeCount={nodeCount}
            onNodeCountChange={handleNodeCountChange}
            onGenerateGraph={handleGenerateGraph}
            isPlaying={isPlaying}
            isFinished={isFinished}
            speed={speed}
            onSpeedChange={setSpeed}
            onPlay={play}
            onPause={pause}
            onReset={reset}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            currentStep={currentStep}
            totalSteps={totalSteps}
            maxNode={graph.nodes.length - 1}
          />

          <GraphStepDescription algorithm={algorithm} step={step} />
        </div>
      </div>
    </div>
  );
}
