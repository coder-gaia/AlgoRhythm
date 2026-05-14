/**
 * Painel de controles do visualizador de sorting.
 * Recebe callbacks do hook useSortingAnimation.
 */
export function SortControls({
  algorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  onGenerateArray,
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
  compact = false,
}) {
  const algorithms = [
    { value: "bubble", label: "Bubble Sort" },
    { value: "selection", label: "Selection Sort" },
    { value: "insertion", label: "Insertion Sort" },
    { value: "merge", label: "Merge Sort" },
    { value: "quick", label: "Quick Sort" },
  ];

  // Velocidade: converte delay (ms) para label legível
  const speedLabel =
    speed <= 50 ? "Rápido" : speed <= 200 ? "Médio" : "Devagar";

  return (
    <div className={`sort-controls ${compact ? "sort-controls--compact" : ""}`}>
      {/* Seleção de algoritmo */}
      {!compact && (
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
      )}

      {/* Tamanho do array */}
      {!compact && (
        <div className="controls-row">
          <label className="control-label">
            Tamanho do array: <span className="control-value">{arraySize}</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            className="control-slider"
          />
        </div>
      )}

      {/* Velocidade */}
      <div className="controls-row">
        <label className="control-label">
          Velocidade: <span className="control-value">{speedLabel}</span>
        </label>
        <input
          type="range"
          min="20"
          max="600"
          step="20"
          value={600 - speed + 20} // inverte: slider direita = mais rápido
          onChange={(e) => onSpeedChange(620 - Number(e.target.value))}
          className="control-slider"
        />
      </div>

      {/* Botões de controle */}
      <div className="controls-buttons">
        <button
          className="btn btn--secondary btn--icon"
          onClick={onStepBackward}
          title="Passo anterior"
          aria-label="Passo anterior"
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
          aria-label="Próximo passo"
        >
          ⏭
        </button>

        <button className="btn btn--ghost" onClick={onReset} title="Resetar">
          Reset
        </button>
      </div>

      {/* Progresso */}
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

      {/* Gerar novo array */}
      {!compact && (
        <button className="btn btn--ghost btn--full" onClick={onGenerateArray}>
          ↻ Gerar novo array
        </button>
      )}
    </div>
  );
}
