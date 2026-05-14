/**
 * BFS — Breadth-First Search — Step Generator
 * Explora o grafo em largura, camada por camada.
 * Usa uma fila (queue) para gerenciar os nós a visitar.
 */
export function bfs(graph, startNode) {
  const steps = [];
  const visited = new Set();
  const queue = [startNode];
  const queueSnapshot = [startNode];
  visited.add(startNode);

  steps.push({
    visitedNodes: [...visited],
    currentNode: startNode,
    activeEdge: null,
    queue: [...queueSnapshot],
    path: [startNode],
    distances: null,
    description: `Iniciando BFS pelo nó ${startNode}. Adicionando à fila.`,
  });

  const path = [startNode];

  while (queue.length > 0) {
    const current = queue.shift();
    queueSnapshot.shift();

    steps.push({
      visitedNodes: [...visited],
      currentNode: current,
      activeEdge: null,
      queue: [...queueSnapshot],
      path: [...path],
      distances: null,
      description: `Processando nó ${current} (removido da frente da fila). Fila atual: [${queueSnapshot.join(", ")}]`,
    });

    const neighbors = graph.adjacency[current] || [];

    for (const { node: neighbor, weight } of neighbors) {
      steps.push({
        visitedNodes: [...visited],
        currentNode: current,
        activeEdge: [current, neighbor],
        queue: [...queueSnapshot],
        path: [...path],
        distances: null,
        description: `Verificando vizinho ${neighbor} do nó ${current} (aresta com peso ${weight})`,
      });

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        queueSnapshot.push(neighbor);
        path.push(neighbor);

        steps.push({
          visitedNodes: [...visited],
          currentNode: neighbor,
          activeEdge: [current, neighbor],
          queue: [...queueSnapshot],
          path: [...path],
          distances: null,
          description: `Nó ${neighbor} não visitado: adicionando à fila. Fila: [${queueSnapshot.join(", ")}]`,
        });
      } else {
        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          activeEdge: [current, neighbor],
          queue: [...queueSnapshot],
          path: [...path],
          distances: null,
          description: `Nó ${neighbor} já foi visitado, ignorando.`,
        });
      }
    }
  }

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    activeEdge: null,
    queue: [],
    path: [...path],
    distances: null,
    description: `✓ BFS completo! ${visited.size} nós visitados na ordem: ${path.join(" → ")}`,
  });

  return steps;
}
