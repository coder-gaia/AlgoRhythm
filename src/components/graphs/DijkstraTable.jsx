import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../../constants/colors";

/**
 * Tabela de distâncias que atualiza em tempo real durante o Dijkstra.
 * Só é renderizada quando o algoritmo selecionado é Dijkstra.
 */
export function DijkstraTable({ step, graph }) {
  if (!step?.distances || !graph) return null;

  const nodes = graph.nodes;
  const distances = step.distances;
  const currentNode = step.currentNode;
  const onPath = step.path ?? [];

  return (
    <div className="dijkstra-table-wrapper">
      <h4 className="table-title">Distâncias do nó inicial</h4>
      <div className="dijkstra-table">
        <div className="table-header">
          <span>Nó</span>
          <span>Distância</span>
          <span>Status</span>
        </div>

        {nodes.map((node) => {
          const dist = distances[node.id];
          const isInfinity = dist === Infinity || dist === undefined;
          const isCurrent = node.id === currentNode;
          const isOnPath = onPath.includes(node.id);

          let statusColor = COLORS.muted;
          let statusLabel = "—";
          if (isCurrent) {
            statusColor = COLORS.nodeCurrent;
            statusLabel = "Atual";
          } else if (isOnPath) {
            statusColor = COLORS.nodePath;
            statusLabel = "No caminho";
          } else if (!isInfinity) {
            statusColor = COLORS.nodeVisited;
            statusLabel = "Visitado";
          }

          return (
            <AnimatePresence key={node.id} mode="wait">
              <motion.div
                className={`table-row ${isCurrent ? "table-row--active" : ""}`}
                animate={{
                  backgroundColor: isCurrent
                    ? "rgba(166,61,82,0.15)"
                    : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    color: COLORS.offwhite,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {node.id}
                </span>
                <motion.span
                  key={dist}
                  initial={{ scale: 1.3, color: COLORS.swapping }}
                  animate={{
                    scale: 1,
                    color: isInfinity ? COLORS.muted : COLORS.offwhite,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 600,
                  }}
                >
                  {isInfinity ? "∞" : dist}
                </motion.span>
                <span style={{ color: statusColor, fontSize: "12px" }}>
                  {statusLabel}
                </span>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
