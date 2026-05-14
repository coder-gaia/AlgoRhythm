import { motion } from "framer-motion";

/**
 * Wrapper de transição de página.
 * Envolve o conteúdo de cada página com uma animação suave de entrada e saída.
 *
 * Uso: envolva o conteúdo de qualquer página com <PageTransition>...</PageTransition>
 */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
