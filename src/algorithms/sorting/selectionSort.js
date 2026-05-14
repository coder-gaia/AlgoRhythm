/**
 * Selection Sort — Step Generator
 * A cada iteração, encontra o menor elemento do subarray não ordenado
 * e o coloca na posição correta.
 */
export function selectionSort(inputArray) {
  const steps = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [...sortedIndices],
      pivot: i, // usamos pivot para destacar o "mínimo atual"
      description: `Iniciando busca do menor elemento a partir do índice ${i}. Mínimo atual: ${array[i]}`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [j, minIndex],
        swapping: [],
        sorted: [...sortedIndices],
        pivot: minIndex,
        description: `Comparando ${array[j]} (índice ${j}) com mínimo atual ${array[minIndex]} (índice ${minIndex})`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length + 1,
        swaps: steps.filter((s) => s.swapping.length > 0).length,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          pivot: minIndex,
          description: `Novo mínimo encontrado: ${array[minIndex]} no índice ${minIndex}`,
          comparisons: steps.filter((s) => s.comparing.length > 0).length,
          swaps: steps.filter((s) => s.swapping.length > 0).length,
        });
      }
    }

    if (minIndex !== i) {
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, minIndex],
        sorted: [...sortedIndices],
        pivot: null,
        description: `Trocando ${array[i]} (índice ${i}) com o mínimo ${array[minIndex]} (índice ${minIndex})`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length,
        swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
      });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    sortedIndices.add(i);
  }

  sortedIndices.add(n - 1);

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
