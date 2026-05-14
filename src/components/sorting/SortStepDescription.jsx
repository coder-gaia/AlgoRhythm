import { motion, AnimatePresence } from "framer-motion";
import { SORTING_INFO } from "../../constants/algorithmInfo";
import { COLORS } from "../../constants/colors";

/**
 * Painel pedagógico do sorting.
 * Mostra descrição do passo atual, complexidades e contadores.
 */
export function SortStepDescription({ algorithm, step, compact = false }) {
  const info = SORTING_INFO[algorithm];
  if (!info || !step) return null;

  return (
    <div
      className={`step-description ${compact ? "step-description--compact" : ""}`}
    >
      {/* Descrição do passo atual */}
      <div className="step-card step-card--highlight">
        <AnimatePresence mode="wait">
          <motion.p
            key={step.description}
            className="step-text"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {step.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Contadores */}
      <div className="step-counters">
        <div className="counter">
          <span className="counter-value" style={{ color: COLORS.comparing }}>
            {step.comparisons ?? 0}
          </span>
          <span className="counter-label">Comparações</span>
        </div>
        <div className="counter">
          <span className="counter-value" style={{ color: COLORS.swapping }}>
            {step.swaps ?? 0}
          </span>
          <span className="counter-label">Trocas</span>
        </div>
      </div>

      {/* Complexidades */}
      {!compact && (
        <>
          <div className="complexity-grid">
            <ComplexityBadge label="Melhor" value={info.best} />
            <ComplexityBadge label="Médio" value={info.average} />
            <ComplexityBadge label="Pior" value={info.worst} />
            <ComplexityBadge label="Espaço" value={info.space} />
          </div>

          <div className="step-card">
            <p className="step-about">{info.description}</p>
            <p className="step-stable">
              {info.stable
                ? "✓ Algoritmo estável — preserva a ordem relativa de elementos iguais."
                : "✗ Algoritmo instável — não preserva a ordem relativa de elementos iguais."}
            </p>
          </div>
        </>
      )}

      {/* Legenda de cores */}
      <div className="color-legend">
        <LegendItem color={COLORS.comparing} label="Comparando" />
        <LegendItem color={COLORS.swapping} label="Trocando" />
        <LegendItem color={COLORS.sorted} label="Ordenado" />
        {algorithm === "quick" && (
          <LegendItem color={COLORS.pivot} label="Pivot" />
        )}
      </div>
    </div>
  );
}

function ComplexityBadge({ label, value }) {
  return (
    <div className="complexity-badge">
      <span className="complexity-label">{label}</span>
      <span className="complexity-value">{value}</span>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ backgroundColor: color }} />
      <span className="legend-label">{label}</span>
    </div>
  );
}
