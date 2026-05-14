import { useState, useMemo, useCallback } from "react";
import { ArrayBars } from "./ArrayBars";
import { SortControls } from "./SortControls";
import { SortStepDescription } from "./SortStepDescription";
import { useSortingAnimation } from "../../hooks/useSortingAnimation";
import { generateArray } from "../../utils/generateArray";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { selectionSort } from "../../algorithms/sorting/selectionSort";
import { insertionSort } from "../../algorithms/sorting/insertionSort";
import { mergeSort } from "../../algorithms/sorting/mergeSort";
import { quickSort } from "../../algorithms/sorting/quickSort";

const SORTERS = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
};

/**
 * Componente orquestrador do visualizador de sorting.
 *
 * Props:
 * @param {string}   algorithm      - (opcional) algoritmo pré-definido (modo side-by-side)
 * @param {number[]} sharedArray    - (opcional) array externo (modo side-by-side)
 * @param {boolean}  compact        - Modo compacto para side-by-side
 * @param {string}   label          - Label exibida no topo (modo side-by-side)
 * @param {function} onAlgorithmChange - Callback (modo side-by-side)
 */
export function SortVisualizer({
  algorithm: propAlgorithm,
  sharedArray,
  compact = false,
  label,
  onAlgorithmChange,
}) {
  const [algorithm, setAlgorithm] = useState(propAlgorithm ?? "bubble");
  const [arraySize, setArraySize] = useState(40);
  const [localArray, setLocalArray] = useState(() => generateArray(40));

  // Usa o array compartilhado (side-by-side) ou o local
  const baseArray = sharedArray ?? localArray;

  // Gera os steps ao mudar o algoritmo ou o array
  const steps = useMemo(
    () => SORTERS[algorithm](baseArray),
    [algorithm, baseArray],
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
    setCurrentStep,
  } = useSortingAnimation(steps);

  const handleAlgorithmChange = useCallback(
    (newAlg) => {
      setAlgorithm(newAlg);
      onAlgorithmChange?.(newAlg);
    },
    [onAlgorithmChange],
  );

  const handleArraySizeChange = useCallback((size) => {
    setArraySize(size);
    setLocalArray(generateArray(size));
  }, []);

  const handleGenerateArray = useCallback(() => {
    setLocalArray(generateArray(arraySize));
  }, [arraySize]);

  // O array exibido é sempre o do step atual (mostra o estado animado)
  const displayArray = step?.array ?? baseArray;

  return (
    <div
      className={`sort-visualizer ${compact ? "sort-visualizer--compact" : ""}`}
    >
      {label && (
        <div className="visualizer-label">
          <select
            className="control-select"
            value={algorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value)}
          >
            {Object.keys(SORTERS).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Sort
              </option>
            ))}
          </select>
        </div>
      )}

      <ArrayBars array={displayArray} step={step} compact={compact} />

      <SortControls
        algorithm={algorithm}
        onAlgorithmChange={handleAlgorithmChange}
        arraySize={arraySize}
        onArraySizeChange={handleArraySizeChange}
        onGenerateArray={handleGenerateArray}
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
        compact={compact}
      />

      <SortStepDescription
        algorithm={algorithm}
        step={step}
        compact={compact}
      />
    </div>
  );
}
