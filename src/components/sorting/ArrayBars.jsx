import { motion } from "framer-motion";
import { getBarColor } from "../../constants/colors";

/**
 * Renderiza o array como barras verticais animadas.
 * Cada barra muda de cor conforme o estado do step atual.
 *
 * @param {number[]} array  - Array de valores (alturas das barras)
 * @param {object}   step   - Step atual da animação
 * @param {boolean}  compact - Modo compacto para side-by-side
 */
export function ArrayBars({ array, step, compact = false }) {
  if (!array || array.length === 0) return null;

  const maxValue = Math.max(...array);
  const containerHeight = compact ? 240 : 400;

  return (
    <div
      className="array-bars-container"
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: array.length > 60 ? "1px" : array.length > 30 ? "2px" : "3px",
        height: `${containerHeight}px`,
        width: "100%",
        padding: "0 8px",
      }}
    >
      {array.map((value, index) => {
        const color = getBarColor(index, step);
        const heightPercent = (value / maxValue) * 100;

        return (
          <motion.div
            key={index}
            style={{
              flex: 1,
              maxWidth: array.length > 60 ? "6px" : "20px",
              height: `${heightPercent}%`,
              backgroundColor: color,
              borderRadius: "2px 2px 0 0",
              minWidth: "2px",
            }}
            animate={{
              backgroundColor: color,
              height: `${heightPercent}%`,
            }}
            transition={{
              backgroundColor: { duration: 0.1 },
              height: { duration: 0.15, ease: "easeOut" },
            }}
          />
        );
      })}
    </div>
  );
}
