export const SORTING_INFO = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    description:
      'Percorre o array repetidamente, comparando elementos adjacentes e trocando-os quando estão fora de ordem. A cada passagem completa, o maior elemento "borbulha" para o final.',
  },
  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: false,
    description:
      "Divide o array em duas partes: ordenada e não-ordenada. A cada iteração, encontra o menor elemento da parte não-ordenada e o move para o final da parte ordenada.",
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    description:
      "Constrói o array ordenado um elemento por vez. Pega cada elemento e o insere na posição correta dentro da porção já ordenada, deslocando os outros para abrir espaço.",
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
    description:
      "Estratégia dividir-para-conquistar: divide o array ao meio recursivamente até ter subarrays de 1 elemento, depois os une (merge) de forma ordenada. Garantia de O(n log n) em qualquer caso.",
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: false,
    description:
      "Escolhe um elemento como pivot e particiona o array em dois grupos: menores e maiores que o pivot. Aplica o processo recursivamente em cada grupo. Na prática, é o mais rápido na maioria dos casos reais.",
  },
};

export const GRAPH_INFO = {
  bfs: {
    name: "Breadth-First Search",
    complexity: "O(V + E)",
    space: "O(V)",
    structure: "Fila (Queue)",
    description:
      "Explora o grafo camada por camada a partir do nó inicial. Usa uma fila para garantir que todos os vizinhos de um nó sejam visitados antes de avançar para o próximo nível. Garante o caminho com menor número de arestas.",
  },
  dfs: {
    name: "Depth-First Search",
    complexity: "O(V + E)",
    space: "O(V)",
    structure: "Stack (Pilha)",
    description:
      "Explora o grafo indo o mais fundo possível em cada caminho antes de retroceder. Usa uma stack para gerenciar os nós a visitar. Útil para detectar ciclos, componentes conexos e topological sort.",
  },
  dijkstra: {
    name: "Dijkstra",
    complexity: "O((V + E) log V)",
    space: "O(V)",
    structure: "Priority Queue",
    description:
      "Encontra o caminho de menor custo (peso total) do nó inicial para todos os outros nós do grafo. Requer pesos positivos. A cada passo, processa o nó não-visitado com menor distância acumulada.",
  },
};
