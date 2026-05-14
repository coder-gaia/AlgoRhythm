/**
 * Quick Sort — Step Generator
 * Implementado de forma ITERATIVA usando uma stack manual.
 * Isso é necessário porque a recursão não permite controlar
 * o fluxo da animação passo a passo de forma previsível.
 */
export function quickSort(inputArray) {
  const steps = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices = new Set();

  // Stack simula a recursão: cada item é [low, high]
  const stack = [[0, n - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop();

    if (low >= high) {
      // Subarray de 1 elemento já está ordenado
      if (low === high) sortedIndices.add(low);
      continue;
    }

    // --- Partição ---
    const pivotValue = array[high];
    let i = low - 1;

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pivot: high,
      description: `Pivot escolhido: ${pivotValue} (índice ${high}). Particionando subarray [${low}–${high}]`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: [...sortedIndices],
        pivot: high,
        description: `Comparando ${array[j]} com pivot ${pivotValue}: ${array[j]} ${array[j] <= pivotValue ? "≤" : ">"} ${pivotValue}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length + 1,
        swaps: steps.filter((s) => s.swapping.length > 0).length,
      });

      if (array[j] <= pivotValue) {
        i++;
        if (i !== j) {
          steps.push({
            array: [...array],
            comparing: [],
            swapping: [i, j],
            sorted: [...sortedIndices],
            pivot: high,
            description: `${array[j]} ≤ ${pivotValue}: trocando ${array[i]} e ${array[j]} (índices ${i} e ${j})`,
            comparisons: steps.filter((s) => s.comparing.length > 0).length,
            swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
          });
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    }

    // Coloca o pivot na posição correta
    const pivotFinalIndex = i + 1;
    [array[pivotFinalIndex], array[high]] = [
      array[high],
      array[pivotFinalIndex],
    ];
    sortedIndices.add(pivotFinalIndex);

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [pivotFinalIndex, high],
      sorted: [...sortedIndices],
      pivot: pivotFinalIndex,
      description: `Pivot ${pivotValue} na posição final: índice ${pivotFinalIndex}. Elementos à esquerda são menores, à direita são maiores.`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
    });

    // Empilha os dois subarrays para processar
    stack.push([low, pivotFinalIndex - 1]);
    stack.push([pivotFinalIndex + 1, high]);
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
