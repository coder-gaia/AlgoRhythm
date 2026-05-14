/**
 * Insertion Sort — Step Generator
 * Constrói o array ordenado um elemento por vez,
 * inserindo cada novo elemento na posição correta.
 */
export function insertionSort(inputArray) {
  const steps = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices = new Set([0]);

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [...sortedIndices],
      pivot: i, // destaca o elemento sendo inserido
      description: `Inserindo ${key} (índice ${i}) na posição correta do subarray ordenado`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length,
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        pivot: j + 1,
        description: `Comparando ${array[j]} com ${key}: ${array[j]} > ${key}, deslocando ${array[j]} para a direita`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length + 1,
        swaps: steps.filter((s) => s.swapping.length > 0).length,
      });

      array[j + 1] = array[j];

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sortedIndices],
        pivot: j,
        description: `Deslocando ${array[j]} do índice ${j} para ${j + 1}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length,
        swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
      });

      j--;
    }

    array[j + 1] = key;
    sortedIndices.add(i);

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pivot: null,
      description: `${key} inserido na posição correta: índice ${j + 1}`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length,
    });
  }

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
