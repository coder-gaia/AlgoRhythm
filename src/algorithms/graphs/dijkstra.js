/**
 * Dijkstra — Shortest Path — Step Generator
 * Encontra o caminho mais curto do nó inicial para todos os outros.
 * Implementado com uma min-priority queue simplificada (array ordenado).
 *
 * REQUISITO: o grafo deve ser conexo e ter pesos positivos.
 * generateGraph.js garante essas condições.
 */
export function dijkstra(graph, startNode) {
  const steps = [];
  const n = graph.nodes.length;
  const INF = Infinity;

  // Inicializa distâncias
  const distances = {};
  const previous = {};
  const visited = new Set();

  for (const node of graph.nodes) {
    distances[node.id] = INF;
    previous[node.id] = null;
  }
  distances[startNode] = 0;

  // Priority queue simplificada: array de { node, dist }, mantido ordenado
  let pq = [{ node: startNode, dist: 0 }];

  steps.push({
    visitedNodes: [...visited],
    currentNode: startNode,
    activeEdge: null,
    queue: [startNode],
    path: [],
    distances: { ...distances },
    description: `Iniciando Dijkstra pelo nó ${startNode}. Distância inicial: 0. Todos os outros nós: ∞`,
  });

  while (pq.length > 0) {
    // Extrai o nó com menor distância (min-heap simulado)
    pq.sort((a, b) => a.dist - b.dist);
    const { node: current, dist: currentDist } = pq.shift();

    if (visited.has(current)) continue;
    if (currentDist === INF) break; // Nós inalcançáveis

    visited.add(current);

    steps.push({
      visitedNodes: [...visited],
      currentNode: current,
      activeEdge: null,
      queue: pq.map((item) => item.node),
      path: getPath(previous, startNode, current),
      distances: { ...distances },
      description: `Processando nó ${current} — distância mínima confirmada: ${currentDist}. Explorando vizinhos...`,
    });

    const neighbors = graph.adjacency[current] || [];

    for (const { node: neighbor, weight } of neighbors) {
      if (visited.has(neighbor)) continue;

      steps.push({
        visitedNodes: [...visited],
        currentNode: current,
        activeEdge: [current, neighbor],
        queue: pq.map((item) => item.node),
        path: getPath(previous, startNode, current),
        distances: { ...distances },
        description: `Verificando aresta ${current} → ${neighbor} (peso ${weight}). Distância atual para ${neighbor}: ${distances[neighbor] === INF ? "∞" : distances[neighbor]}`,
      });

      const newDist = distances[current] + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = current;
        pq.push({ node: neighbor, dist: newDist });

        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          activeEdge: [current, neighbor],
          queue: pq.map((item) => item.node),
          path: getPath(previous, startNode, neighbor),
          distances: { ...distances },
          description: `✓ Caminho melhorado! Nova distância para ${neighbor}: ${newDist} (${distances[current]} + ${weight})`,
        });
      } else {
        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          activeEdge: [current, neighbor],
          queue: pq.map((item) => item.node),
          path: getPath(previous, startNode, current),
          distances: { ...distances },
          description: `Caminho via ${current} para ${neighbor} (${newDist}) não melhora a distância atual (${distances[neighbor]}). Ignorando.`,
        });
      }
    }
  }

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    activeEdge: null,
    queue: [],
    path: [],
    distances: { ...distances },
    description: `✓ Dijkstra completo! Distâncias mínimas de ${startNode} para todos os nós calculadas.`,
  });

  return steps;
}

/**
 * Reconstrói o caminho do nó inicial até o destino
 * usando o mapa de predecessores.
 */
function getPath(previous, start, end) {
  const path = [];
  let current = end;

  while (current !== null && current !== undefined) {
    path.unshift(current);
    if (current === start) break;
    current = previous[current];
  }

  return path.length > 1 ? path : [];
}
