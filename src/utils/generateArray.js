/**
 * Gera um array de inteiros aleatórios sem repetição.
 * @param {number} size - Quantidade de elementos (10 a 100)
 * @param {number} min  - Valor mínimo (default: 5)
 * @param {number} max  - Valor máximo (default: 400 — altura máxima da barra em px)
 */
export function generateArray(size = 50, min = 5, max = 400) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
}
