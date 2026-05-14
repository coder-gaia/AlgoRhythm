import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="hero-eyebrow">Visualizador Interativo</p>
          <h1 className="hero-title">AlgoRhythm</h1>
          <p className="hero-subtitle">
            Veja algoritmos clássicos tomando forma, passo a passo. Controle a
            velocidade, retroceda, avance — entenda de verdade o que está
            acontecendo.
          </p>
        </motion.div>

        <motion.div
          className="hero-cards"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Link to="/sorting" className="hero-card">
            <div className="hero-card-icon">≡</div>
            <h2 className="hero-card-title">Sorting Algorithms</h2>
            <p className="hero-card-desc">
              Bubble, Selection, Insertion, Merge e Quick Sort. Compare dois
              algoritmos lado a lado e veja quem termina primeiro.
            </p>
            <div className="hero-card-tags">
              <span className="tag">5 algoritmos</span>
              <span className="tag">Side-by-side</span>
              <span className="tag">Passo a passo</span>
            </div>
            <span className="hero-card-cta">Explorar →</span>
          </Link>

          <Link to="/graphs" className="hero-card">
            <div className="hero-card-icon">◎</div>
            <h2 className="hero-card-title">Graph Algorithms</h2>
            <p className="hero-card-desc">
              BFS, DFS e Dijkstra em grafos gerados automaticamente. Veja a
              tabela de distâncias do Dijkstra atualizar em tempo real.
            </p>
            <div className="hero-card-tags">
              <span className="tag">3 algoritmos</span>
              <span className="tag">Grafo dinâmico</span>
              <span className="tag">Dijkstra table</span>
            </div>
            <span className="hero-card-cta">Explorar →</span>
          </Link>
        </motion.div>
      </section>

      <footer className="home-footer">
        <p>Feito com React · Framer Motion · muito café</p>
      </footer>
    </main>
  );
}
