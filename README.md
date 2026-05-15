# AlgoRhythm

Visualizador interativo de algoritmos clássicos de ordenação e busca em grafos. Construído em React, com foco em clareza pedagógica, controle total do usuário e design elegante.

## 🔗 **[Demo ao vivo](https://algorhythm-rho.vercel.app/)**

## Por que esse projeto existe

A maioria dos visualizadores de algoritmos disponíveis online serve apenas para assistir. O AlgoRhythm foi construído para quem quer entender — você pode pausar em qualquer passo, retroceder, ajustar a velocidade e ler a descrição exata do que está acontecendo naquele momento. A ideia surgiu durante o estudo de Estrutura de Dados na faculdade: eu precisava de uma ferramenta assim e decidi construir.

---

## Funcionalidades

### Sorting Algorithms `/sorting`

- **5 algoritmos:** Bubble, Selection, Insertion, Merge e Quick Sort
- **Modo individual:** visualização em tela cheia com controles completos
- **Modo side-by-side:** compare dois algoritmos com o mesmo array inicial e veja quem termina primeiro
- **Controles:** play, pause, passo a passo (avançar e retroceder), velocidade ajustável, tamanho do array configurável
- **Painel pedagógico:** descrição em texto do passo atual, contadores de comparações e trocas em tempo real, complexidade de tempo/espaço, explicação da estratégia do algoritmo
- **Gráfico de complexidade:** curvas O(n), O(n log n) e O(n²) com destaque automático para o algoritmo selecionado e linha de referência no tamanho atual do array

### Graph Algorithms `/graphs`

- **3 algoritmos:** BFS, DFS e Dijkstra
- Grafos gerados automaticamente com conectividade garantida
- Visualização em SVG com animações via Framer Motion
- **Painel pedagógico:** descrição do passo atual, fila/stack em tempo real (BFS e DFS), tabela de distâncias ao vivo (Dijkstra), caminho percorrido destacado
- Controle de nó inicial, quantidade de nós e velocidade

### Histórico `/history`

- Cada execução completa é salva automaticamente no `localStorage`
- Estatísticas gerais: total de execuções, algoritmo mais usado, média de comparações
- Tabela com algoritmo, tamanho do array, comparações, trocas, passos e data/hora

---

## Decisões de arquitetura

### O padrão Step Generator

Essa é a decisão mais importante do projeto. Cada algoritmo não anima diretamente — ele gera uma lista completa de passos pré-calculados antes de qualquer renderização.

```js
// Cada step descreve o estado completo do array naquele momento
{
  array: [4, 2, 7, 1, 5],
  comparing: [1, 2],      // índices sendo comparados
  swapping: [1, 3],       // índices sendo trocados
  sorted: [0, 4],         // índices já ordenados
  pivot: 2,               // pivot atual (Quick Sort)
  description: "Comparando 7 e 1: 7 > 1, realizando troca",
  comparisons: 12,
  swaps: 4,
}
```

**Por que isso funciona tão bem:**

- Play/pause é trivial — só parar o índice do step atual
- Retroceder é `currentStep - 1` — sem recalcular nada
- Velocidade é um `setInterval` com delay variável
- O painel pedagógico recebe `steps[currentStep].description` e pronto
- A UI fica completamente desacoplada da lógica dos algoritmos

### Hooks customizados como única fonte de verdade

Toda a lógica de animação vive em `useSortingAnimation` e `useGraphAnimation`. Os componentes só renderizam o que o hook expõe — eles não sabem nada sobre `setInterval`, índices ou steps.

```
useSortingAnimation(steps)
  → currentStep, isPlaying, isFinished
  → play, pause, reset, stepForward, stepBackward, setSpeed
```

Isso permite que o `SortVisualizer` seja usado tanto no modo individual quanto no side-by-side sem nenhuma adaptação — cada instância tem seu próprio hook com estado completamente independente.

### SVG para grafos, sem bibliotecas externas

Os grafos são renderizados em SVG puro com animações via Framer Motion — sem D3, sem Cytoscape, sem qualquer biblioteca de grafos. Cada nó é um `<circle>`, cada aresta é uma `<line>`, e as cores são controladas por funções puras que recebem o step atual.

A conectividade do grafo é garantida por uma spanning tree gerada antes de adicionar arestas extras aleatórias — o que assegura que o Dijkstra sempre encontrará caminhos para todos os nós.

### Quick Sort iterativo

O Quick Sort foi implementado de forma iterativa com uma stack manual, em vez de recursivo. A razão: recursão em JavaScript impossibilita o controle passo a passo da animação, pois a call stack não é acessível. A stack simulada dá controle total sobre o fluxo de execução.

### Merge Sort com array flat

O Merge Sort é o mais complexo de visualizar porque opera em subarrays isolados. A solução foi sempre trabalhar com uma cópia flat do array completo durante a geração dos steps, espelhando cada operação de merge no estado principal — assim cada step tem o array completo e correto para renderizar.

---

## Stack

| Tecnologia       | Uso                                             |
| ---------------- | ----------------------------------------------- |
| React 18         | UI e gerenciamento de estado                    |
| Vite             | Build e dev server                              |
| React Router DOM | Roteamento entre páginas                        |
| Framer Motion    | Animações de barras, nós e transições de página |
| Recharts         | Gráfico de complexidade                         |
| CSS Variables    | Design system e paleta de cores                 |

Sem backend. Sem banco de dados. 100% estático — deploy instantâneo.

---

## Estrutura do projeto

```
src/
├── algorithms/
│   ├── sorting/          # bubbleSort, selectionSort, insertionSort, mergeSort, quickSort
│   └── graphs/           # bfs, dfs, dijkstra
├── components/
│   ├── layout/           # Navbar, PageTransition
│   ├── sorting/          # SortVisualizer, ArrayBars, SortControls, SortStepDescription, ComplexityChart
│   └── graphs/           # GraphVisualizer, GraphCanvas, GraphControls, GraphStepDescription, DijkstraTable
├── hooks/
│   ├── useSortingAnimation.js
│   └── useGraphAnimation.js
├── pages/                # Home, Sorting, Graphs, History
├── utils/                # generateArray, generateGraph, history
└── constants/            # algorithmInfo, colors
```

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/algorhythm.git
cd algorhythm

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## Deploy

O projeto está hospedado na Vercel. Para fazer o seu próprio deploy:

1. Faça push para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Clique em Deploy — a Vercel detecta o Vite automaticamente

---

## Autor

Desenvolvido por **Alexandre Gaia da Silva** — desenvolvedor full stack.

🔗 **[Portfólio](https://alexandregaia.netlify.app/)** · 💻 [Linkedin](https://www.linkedin.com/in/alexandre-gaia/)
