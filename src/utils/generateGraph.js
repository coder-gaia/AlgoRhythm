/**
 * Gera um grafo aleatório conexo com pesos positivos.
 *
 * Estratégia para garantir conectividade:
 * 1. Cria uma spanning tree conectando todos os nós (garante que o grafo é conexo)
 * 2. Adiciona arestas extras aleatórias para deixar o grafo mais interessante
 * 3. Posiciona os nós em distribuição circular com variação para evitar sobreposição
 *
 * O grafo é não-direcionado: cada aresta aparece nos dois sentidos na adjacência.
 */
export function generateGraph(nodeCount = 10, svgWidth = 700, svgHeight = 500) {
  const nodes = [];
  const edges = [];

  const padding = 60;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const radius = Math.min(svgWidth, svgHeight) / 2 - padding;

  // Posiciona os nós em círculo com leve variação aleatória
  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2;
    const jitter = (Math.random() - 0.5) * 40; // variação de ±20px

    nodes.push({
      id: i,
      x: centerX + (radius + jitter) * Math.cos(angle),
      y: centerY + (radius + jitter) * Math.sin(angle),
      label: String(i),
    });
  }

  const addEdge = (from, to) => {
    const weight = Math.floor(Math.random() * 19) + 1; // peso entre 1 e 20

    // Evita arestas duplicadas
    const alreadyExists = edges.some(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from),
    );
    if (alreadyExists) return;

    edges.push({ from, to, weight });
  };

  // --- Spanning tree: conecta todos os nós garantindo conectividade ---
  const shuffledIndices = Array.from({ length: nodeCount }, (_, i) => i).sort(
    () => Math.random() - 0.5,
  );

  for (let i = 1; i < nodeCount; i++) {
    const from = shuffledIndices[Math.floor(Math.random() * i)];
    const to = shuffledIndices[i];
    addEdge(from, to);
  }

  // --- Arestas extras aleatórias (torna o grafo mais rico) ---
  const extraEdgeCount = Math.floor(nodeCount * 0.5);
  for (let i = 0; i < extraEdgeCount; i++) {
    const from = Math.floor(Math.random() * nodeCount);
    const to = Math.floor(Math.random() * nodeCount);
    if (from !== to) addEdge(from, to);
  }

  // --- Monta lista de adjacência ---
  // Formato: { [nodeId]: [ { node, weight }, ... ] }
  const adjacency = {};
  for (let i = 0; i < nodeCount; i++) adjacency[i] = [];

  for (const { from, to, weight } of edges) {
    adjacency[from].push({ node: to, weight });
    adjacency[to].push({ node: from, weight });
  }

  return { nodes, edges, adjacency };
}
