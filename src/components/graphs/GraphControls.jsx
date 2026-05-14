/**
 * Painel de controles do visualizador de grafos.
 */
export function GraphControls({
  algorithm,
  onAlgorithmChange,
  startNode,
  onStartNodeChange,
  nodeCount,
  onNodeCountChange,
  onGenerateGraph,
  isPlaying,
  isFinished,
  speed,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  currentStep,
  totalSteps,
  maxNode,
}) {
  const algorithms = [
    { value: "bfs", label: "BFS — Busca em Largura" },
    { value: "dfs", label: "DFS — Busca em Profundidade" },
    { value: "dijkstra", label: "Dijkstra — Caminho Mínimo" },
  ];

  const speedLabel =
    speed <= 200 ? "Rápido" : speed <= 500 ? "Médio" : "Devagar";

  return (
    <div className="sort-controls">
      <div className="controls-row">
        <label className="control-label">Algoritmo</label>
        <select
          className="control-select"
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
        >
          {algorithms.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div className="controls-row">
        <label className="control-label">
          Nó inicial: <span className="control-value">{startNode}</span>
        </label>
        <input
          type="range"
          min="0"
          max={maxNode}
          value={startNode}
          onChange={(e) => onStartNodeChange(Number(e.target.value))}
          className="control-slider"
        />
      </div>

      <div className="controls-row">
        <label className="control-label">
          Nós no grafo: <span className="control-value">{nodeCount}</span>
        </label>
        <input
          type="range"
          min="6"
          max="14"
          value={nodeCount}
          onChange={(e) => onNodeCountChange(Number(e.target.value))}
          className="control-slider"
        />
      </div>

      <div className="controls-row">
        <label className="control-label">
          Velocidade: <span className="control-value">{speedLabel}</span>
        </label>
        <input
          type="range"
          min="100"
          max="900"
          step="100"
          value={900 - speed + 100}
          onChange={(e) => onSpeedChange(1000 - Number(e.target.value))}
          className="control-slider"
        />
      </div>

      <div className="controls-buttons">
        <button
          className="btn btn--secondary btn--icon"
          onClick={onStepBackward}
          title="Passo anterior"
        >
          ⏮
        </button>

        {isPlaying && !isFinished ? (
          <button className="btn btn--primary" onClick={onPause}>
            ⏸ Pausar
          </button>
        ) : (
          <button className="btn btn--primary" onClick={onPlay}>
            {isFinished
              ? "↺ Reiniciar"
              : currentStep === 0
                ? "▶ Iniciar"
                : "▶ Continuar"}
          </button>
        )}

        <button
          className="btn btn--secondary btn--icon"
          onClick={onStepForward}
          title="Próximo passo"
        >
          ⏭
        </button>

        <button className="btn btn--ghost" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="controls-progress">
        <div
          className="progress-bar"
          style={{
            width:
              totalSteps > 0
                ? `${(currentStep / (totalSteps - 1)) * 100}%`
                : "0%",
          }}
        />
      </div>
      <p className="controls-step-count">
        Passo {currentStep} de {totalSteps - 1}
      </p>

      <button className="btn btn--ghost btn--full" onClick={onGenerateGraph}>
        ↻ Gerar novo grafo
      </button>
    </div>
  );
}
