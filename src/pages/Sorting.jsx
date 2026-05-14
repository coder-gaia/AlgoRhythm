import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SortVisualizer } from "../components/sorting/SortVisualizer";
import { generateArray } from "../utils/generateArray";

export default function Sorting() {
  const [mode, setMode] = useState("single"); // 'single' | 'compare'
  const [sharedArray, setSharedArray] = useState(() => generateArray(40));
  const [algorithmA, setAlgorithmA] = useState("bubble");
  const [algorithmB, setAlgorithmB] = useState("merge");

  const handleGenerateShared = useCallback(() => {
    setSharedArray(generateArray(40));
  }, []);

  return (
    <main className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Sorting Algorithms</h1>
        <p className="page-subtitle">
          Visualize e compare algoritmos de ordenação clássicos, passo a passo.
        </p>

        {/* Toggle de modo */}
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "single" ? "mode-btn--active" : ""}`}
            onClick={() => setMode("single")}
          >
            Individual
          </button>
          <button
            className={`mode-btn ${mode === "compare" ? "mode-btn--active" : ""}`}
            onClick={() => setMode("compare")}
          >
            Comparar lado a lado
          </button>
        </div>
      </motion.div>

      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {mode === "single" ? (
          <SortVisualizer />
        ) : (
          <div className="compare-layout">
            <div className="compare-header">
              <p className="compare-hint">
                Ambos usam o mesmo array inicial. Clique em{" "}
                <strong>Iniciar</strong> nos dois para comparar.
              </p>
              <button className="btn btn--ghost" onClick={handleGenerateShared}>
                ↻ Gerar novo array compartilhado
              </button>
            </div>

            <div className="compare-grid">
              <SortVisualizer
                algorithm={algorithmA}
                sharedArray={sharedArray}
                compact
                label="Algoritmo A"
                onAlgorithmChange={setAlgorithmA}
              />
              <SortVisualizer
                algorithm={algorithmB}
                sharedArray={sharedArray}
                compact
                label="Algoritmo B"
                onAlgorithmChange={setAlgorithmB}
              />
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
