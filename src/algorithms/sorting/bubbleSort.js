/**
 * Bubble Sort — Step Generator
 * Gera uma lista de passos para animação.
 * Cada passo descreve o estado completo do array naquele momento.
 */
export function bubbleSort(inputArray) {
  const steps = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Passo: comparação
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        pivot: null,
        description: `Comparando ${array[j]} e ${array[j + 1]}: ${array[j]} ${array[j] > array[j + 1] ? ">" : "≤"} ${array[j + 1]}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length + 1,
        swaps: steps.filter((s) => s.swapping.length > 0).length,
      });

      if (array[j] > array[j + 1]) {
        // Passo: troca
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedIndices],
          pivot: null,
          description: `${array[j]} > ${array[j + 1]}: realizando troca entre índices ${j} e ${j + 1}`,
          comparisons: steps.filter((s) => s.comparing.length > 0).length,
          swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
        });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }

    sortedIndices.add(n - 1 - i);
  }

  sortedIndices.add(0);

  // Passo final: tudo ordenado
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    pivot: null,
    description: "✓ Array completamente ordenado!",
    comparisons: steps.filter((s) => s.comparing.length > 0).length,
    swaps: steps.filter((s) => s.swapping.length > 0).length,
  });

  return steps;
}
