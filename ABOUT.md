# AlgoRhythm — About

## O projeto

AlgoRhythm é um visualizador interativo de algoritmos clássicos de ordenação e busca em grafos. A proposta vai além de "assistir" — o usuário tem controle total da execução: pode pausar, retroceder passo a passo, ajustar a velocidade e acompanhar em texto o que está acontecendo em cada etapa.

Surgiu de uma necessidade real durante o estudo de Estrutura de Dados: eu precisava de uma ferramenta pedagógica de verdade, não só visual. Então construí uma.

---

## O que ele faz

Dois módulos principais: **Sorting** e **Graphs**.

No módulo de sorting você pode visualizar Bubble, Selection, Insertion, Merge e Quick Sort individualmente ou em modo de comparação lado a lado — dois algoritmos rodando com o mesmo array, competindo. Um gráfico de complexidade mostra as curvas O(n), O(n log n) e O(n²) e destaca automaticamente a curva do algoritmo selecionado, com uma linha de referência se movendo conforme você ajusta o tamanho do array.

No módulo de grafos, BFS, DFS e Dijkstra rodam sobre grafos gerados automaticamente. O Dijkstra tem uma tabela de distâncias que atualiza em tempo real a cada passo, mostrando exatamente como o algoritmo decide qual nó processar a seguir.

Um histórico de execuções é salvo no localStorage — cada vez que um algoritmo termina, você tem o registro de quantas comparações, trocas e passos foram necessários.

---

## Decisão técnica principal

Todos os algoritmos geram uma lista de passos pré-calculados antes de qualquer animação. Cada passo descreve o estado completo: quais índices estão sendo comparados, quais estão sendo trocados, quais já estão no lugar certo, e uma descrição em texto do que está acontecendo.

Isso mantém a UI completamente desacoplada da lógica — os componentes só renderizam. Play, pause e retroceder são triviais porque é só navegar por essa lista. A velocidade é um `setInterval` com delay variável.

---

## Stack

React · Vite · Framer Motion · React Router · Recharts · CSS Variables

Sem backend. Sem banco de dados. Deploy estático na Vercel.

---

## Links

🔗 [Demo ao vivo](#) · 💻 [Repositório](#)
