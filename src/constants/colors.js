/**
 * Espelha os CSS variables em JS para uso com Framer Motion.
 * Sempre que atualizar a paleta no CSS, atualizar aqui também.
 */
export const COLORS = {
  bg: "#0A0A0A",
  surface: "#141414",
  border: "#1E1E1E",

  wine: "#7B2D3E",
  wineLight: "#A63D52",
  emerald: "#2D7B5A",
  emeraldLight: "#3DA876",

  offwhite: "#F2EDE6",
  muted: "#7A7570",

  // Estados dos algoritmos de sorting
  barDefault: "#2A2A2A",
  comparing: "#A63D52", // vinho claro — comparação
  swapping: "#E8C547", // amarelo — troca
  sorted: "#3DA876", // esmeralda claro — ordenado
  pivot: "#C97B30", // laranja — pivot

  // Estados dos grafos
  nodeDefault: "#1E1E1E",
  nodeVisited: "#2D7B5A",
  nodeCurrent: "#A63D52",
  nodePath: "#E8C547",
  edgeDefault: "#333333",
  edgeActive: "#A63D52",
};

/**
 * Retorna a cor de uma barra baseado no estado do step atual.
 * @param {number} index
 * @param {object} step
 */
export function getBarColor(index, step) {
  if (!step) return COLORS.barDefault;
  if (step.sorted?.includes(index)) return COLORS.sorted;
  if (step.swapping?.includes(index)) return COLORS.swapping;
  if (step.comparing?.includes(index)) return COLORS.comparing;
  if (step.pivot === index) return COLORS.pivot;
  return COLORS.barDefault;
}

/**
 * Retorna a cor de um nó do grafo baseado no estado do step atual.
 */
export function getNodeColor(nodeId, step) {
  if (!step) return COLORS.nodeDefault;
  if (step.currentNode === nodeId) return COLORS.nodeCurrent;
  if (step.path?.includes(nodeId)) return COLORS.nodePath;
  if (step.visitedNodes?.includes(nodeId)) return COLORS.nodeVisited;
  return COLORS.nodeDefault;
}

/**
 * Retorna a cor de uma aresta do grafo baseado no estado do step atual.
 */
export function getEdgeColor(from, to, step) {
  if (!step || !step.activeEdge) return COLORS.edgeDefault;
  const [a, b] = step.activeEdge;
  if ((a === from && b === to) || (a === to && b === from))
    return COLORS.edgeActive;
  return COLORS.edgeDefault;
}
