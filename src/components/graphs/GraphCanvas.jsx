import { motion } from "framer-motion";
import { getNodeColor, getEdgeColor, COLORS } from "../../constants/colors";

const SVG_WIDTH = 700;
const SVG_HEIGHT = 460;

/**
 * Renderiza o grafo em SVG com nós e arestas animados via Framer Motion.
 *
 * @param {object} graph - { nodes, edges, adjacency }
 * @param {object} step  - Step atual da animação
 */
export function GraphCanvas({ graph, step }) {
  if (!graph) return null;

  const { nodes, edges } = graph;

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      className="graph-canvas"
      style={{ width: "100%", height: "auto", maxHeight: "460px" }}
    >
      {/* Arestas */}
      {edges.map((edge, i) => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        const color = getEdgeColor(edge.from, edge.to, step);

        // Ponto médio para o label do peso
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;

        return (
          <g key={`edge-${i}`}>
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={color}
              strokeWidth={color === COLORS.edgeActive ? 2.5 : 1.5}
              animate={{
                stroke: color,
                strokeWidth: color === COLORS.edgeActive ? 2.5 : 1.5,
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Peso da aresta */}
            <text
              x={midX}
              y={midY - 6}
              textAnchor="middle"
              fill={
                color === COLORS.edgeActive ? COLORS.offwhite : COLORS.muted
              }
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
            >
              {edge.weight}
            </text>
          </g>
        );
      })}

      {/* Nós */}
      {nodes.map((node) => {
        const color = getNodeColor(node.id, step);
        const isActive = step?.currentNode === node.id;
        const isOnPath = step?.path?.includes(node.id);

        return (
          <g key={`node-${node.id}`}>
            {/* Halo de destaque no nó ativo */}
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={28}
                fill="none"
                stroke={COLORS.wineLight}
                strokeWidth={1.5}
                initial={{ opacity: 0, r: 20 }}
                animate={{ opacity: 0.4, r: 28 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 22 : 18}
              fill={color}
              stroke={isOnPath ? COLORS.nodePath : COLORS.border}
              strokeWidth={isOnPath ? 2 : 1}
              animate={{
                fill: color,
                r: isActive ? 22 : 18,
                stroke: isOnPath ? COLORS.nodePath : COLORS.border,
              }}
              transition={{ duration: 0.25 }}
            />

            {/* Label do nó */}
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill={COLORS.offwhite}
              fontSize={isActive ? "14" : "12"}
              fontWeight="600"
              fontFamily="JetBrains Mono, monospace"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
