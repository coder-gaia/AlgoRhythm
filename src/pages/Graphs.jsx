import { motion } from "framer-motion";
import { GraphVisualizer } from "../components/graphs/GraphVisualizer";

export default function Graphs() {
  return (
    <main className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Graph Algorithms</h1>
        <p className="page-subtitle">
          Explore BFS, DFS e Dijkstra em grafos gerados automaticamente.
        </p>
      </motion.div>

      <GraphVisualizer />
    </main>
  );
}
