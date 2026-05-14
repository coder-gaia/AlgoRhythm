import { motion, AnimatePresence } from "framer-motion";
import { GRAPH_INFO } from "../../constants/algorithmInfo";
import { COLORS } from "../../constants/colors";

export function GraphStepDescription({ algorithm, step }) {
  const info = GRAPH_INFO[algorithm];
  if (!info || !step) return null;

  const structureLabel =
    algorithm === "bfs"
      ? "Fila"
      : algorithm === "dfs"
        ? "Stack"
        : "Priority Queue";
  const currentStructure = step.queue ?? [];

  return (
    <div className="step-description">
      {/* Descrição do passo */}
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

      {/* Fila / Stack / Priority Queue atual */}
      {algorithm !== "dijkstra" && (
        <div className="step-card">
          <p className="control-label">{structureLabel} atual:</p>
          <div className="structure-display">
            {currentStructure.length === 0 ? (
              <span style={{ color: COLORS.muted }}>vazia</span>
            ) : (
              currentStructure.map((nodeId, i) => (
                <motion.span
                  key={`${nodeId}-${i}`}
                  className="structure-item"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                >
                  {nodeId}
                </motion.span>
              ))
            )}
          </div>
        </div>
      )}

      {/* Caminho visitado */}
      {step.path && step.path.length > 0 && (
        <div className="step-card">
          <p className="control-label">Caminho percorrido:</p>
          <p
            style={{
              color: COLORS.nodePath,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "14px",
              marginTop: "6px",
            }}
          >
            {step.path.join(" → ")}
          </p>
        </div>
      )}

      {/* Complexidade */}
      <div className="complexity-grid">
        <div className="complexity-badge">
          <span className="complexity-label">Complexidade</span>
          <span className="complexity-value">{info.complexity}</span>
        </div>
        <div className="complexity-badge">
          <span className="complexity-label">Espaço</span>
          <span className="complexity-value">{info.space}</span>
        </div>
      </div>

      {/* Sobre o algoritmo */}
      <div className="step-card">
        <p className="step-about">{info.description}</p>
      </div>

      {/* Legenda */}
      <div className="color-legend">
        <LegendItem color={COLORS.nodeCurrent} label="Nó atual" />
        <LegendItem color={COLORS.nodeVisited} label="Visitado" />
        <LegendItem color={COLORS.nodePath} label="No caminho" />
        <LegendItem color={COLORS.edgeActive} label="Aresta ativa" />
      </div>
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
