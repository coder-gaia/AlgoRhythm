/**
 * DFS — Depth-First Search — Step Generator
 * Explora o grafo em profundidade usando uma stack explícita
 * (implementação iterativa para consistência com o padrão do projeto).
 */
export function dfs(graph, startNode) {
  const steps = [];
  const visited = new Set();
  const stack = [startNode];
  const stackSnapshot = [startNode];
  const path = [];

  steps.push({
    visitedNodes: [...visited],
    currentNode: startNode,
    activeEdge: null,
    queue: [...stackSnapshot], // reutilizamos "queue" para exibir a stack na UI
    path: [],
    distances: null,
    description: `Iniciando DFS pelo nó ${startNode}. Adicionando à stack.`,
  });

  while (stack.length > 0) {
    const current = stack.pop();
    stackSnapshot.pop();

    if (visited.has(current)) continue;

    visited.add(current);
    path.push(current);

    steps.push({
      visitedNodes: [...visited],
      currentNode: current,
      activeEdge: null,
      queue: [...stackSnapshot],
      path: [...path],
      distances: null,
      description: `Visitando nó ${current} (retirado do topo da stack). Stack atual: [${stackSnapshot.join(", ")}]`,
    });

    const neighbors = graph.adjacency[current] || [];

    // Invertemos para manter a ordem natural de exploração
    const reversedNeighbors = [...neighbors].reverse();

    for (const { node: neighbor, weight } of reversedNeighbors) {
      steps.push({
        visitedNodes: [...visited],
        currentNode: current,
        activeEdge: [current, neighbor],
        queue: [...stackSnapshot],
        path: [...path],
        distances: null,
        description: `Verificando vizinho ${neighbor} do nó ${current} (aresta com peso ${weight})`,
      });

      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        stackSnapshot.push(neighbor);

        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          activeEdge: [current, neighbor],
          queue: [...stackSnapshot],
          path: [...path],
          distances: null,
          description: `Nó ${neighbor} não visitado: adicionando ao topo da stack. Stack: [${stackSnapshot.join(", ")}]`,
        });
      } else {
        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          activeEdge: [current, neighbor],
          queue: [...stackSnapshot],
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
    description: `✓ DFS completo! ${visited.size} nós visitados na ordem: ${path.join(" → ")}`,
  });

  return steps;
}
