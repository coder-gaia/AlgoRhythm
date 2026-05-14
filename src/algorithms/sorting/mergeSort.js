/**
 * Merge Sort — Step Generator
 * O mais complexo de visualizar porque opera em subarrays.
 * A estratégia: sempre trabalhamos com uma cópia flat do array,
 * espelhando cada operação de merge no array principal para que
 * cada step mostre o estado correto completo.
 */
export function mergeSort(inputArray) {
  const steps = [];
  const array = [...inputArray];
  const n = array.length;

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        pivot: null,
        description: `Merge [${left}–${right}]: comparando ${leftArr[i]} e ${rightArr[j]}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length + 1,
        swaps: steps.filter((s) => s.swapping.length > 0).length,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        pivot: null,
        description: `Colocando ${arr[k]} na posição ${k}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length,
        swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
      });

      k++;
    }

    // Copia os restantes do lado esquerdo
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        pivot: null,
        description: `Copiando elemento restante ${arr[k]} para posição ${k}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length,
        swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
      });
      i++;
      k++;
    }

    // Copia os restantes do lado direito
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        pivot: null,
        description: `Copiando elemento restante ${arr[k]} para posição ${k}`,
        comparisons: steps.filter((s) => s.comparing.length > 0).length,
        swaps: steps.filter((s) => s.swapping.length > 0).length + 1,
      });
      j++;
      k++;
    }
  }

  function mergeSortHelper(arr, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      pivot: null,
      description: `Dividindo subarray [${left}–${right}] ao meio (mid = ${mid})`,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapping.length > 0).length,
    });

    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSortHelper(array, 0, n - 1);

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
