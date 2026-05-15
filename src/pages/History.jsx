import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadHistory, clearHistory } from "../utils/history";
import { SORTING_INFO } from "../constants/algorithmInfo";
import { COLORS } from "../constants/colors";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatCard({ label, value, color }) {
  return (
    <div className="history-stat-card">
      <span className="history-stat-value" style={{ color }}>
        {value}
      </span>
      <span className="history-stat-label">{label}</span>
    </div>
  );
}

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  // Estatísticas gerais
  const totalRuns = history.length;
  const mostUsed =
    history.length > 0
      ? Object.entries(
          history.reduce((acc, e) => {
            acc[e.algorithm] = (acc[e.algorithm] || 0) + 1;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0]
      : null;

  const avgComparisons =
    totalRuns > 0
      ? Math.round(
          history.reduce((sum, e) => sum + e.comparisons, 0) / totalRuns,
        )
      : 0;

  return (
    <main className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Histórico de Execuções</h1>
        <p className="page-subtitle">
          Cada vez que um algoritmo termina de rodar, ele é registrado aqui.
        </p>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          className="history-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="history-empty-icon">◎</p>
          <p className="history-empty-title">Nenhuma execução ainda</p>
          <p className="history-empty-desc">
            Vá até Sorting Algorithms, rode um algoritmo até o fim e ele
            aparecerá aqui.
          </p>
        </motion.div>
      ) : (
        <>
          {/* Estatísticas gerais */}
          <motion.div
            className="history-stats"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              label="Execuções totais"
              value={totalRuns}
              color={COLORS.offwhite}
            />
            <StatCard
              label="Algoritmo favorito"
              value={mostUsed ? SORTING_INFO[mostUsed[0]]?.name : "—"}
              color={COLORS.wineLight}
            />
            <StatCard
              label="Média de comparações"
              value={avgComparisons.toLocaleString("pt-BR")}
              color={COLORS.emeraldLight}
            />
          </motion.div>

          {/* Tabela */}
          <motion.div
            className="history-table-wrapper"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="history-table-header">
              <span>Algoritmo</span>
              <span>Array</span>
              <span>Comparações</span>
              <span>Trocas</span>
              <span>Passos</span>
              <span>Data</span>
            </div>

            <AnimatePresence>
              {history.map((entry, i) => {
                const info = SORTING_INFO[entry.algorithm];
                return (
                  <motion.div
                    key={entry.id}
                    className="history-table-row"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <span
                      className="history-algo-name"
                      style={{ color: COLORS.wineLight }}
                    >
                      {info?.name ?? entry.algorithm}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: COLORS.offwhite,
                      }}
                    >
                      {entry.arraySize} el.
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: COLORS.comparing,
                      }}
                    >
                      {entry.comparisons.toLocaleString("pt-BR")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: COLORS.swapping,
                      }}
                    >
                      {entry.swaps.toLocaleString("pt-BR")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: COLORS.muted,
                      }}
                    >
                      {entry.steps}
                    </span>
                    <span style={{ fontSize: 12, color: COLORS.muted }}>
                      {formatDate(entry.date)}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <button className="btn btn--ghost" onClick={handleClear}>
              ✕ Limpar histórico
            </button>
          </div>
        </>
      )}
    </main>
  );
}
