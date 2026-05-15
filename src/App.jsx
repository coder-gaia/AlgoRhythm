import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { PageTransition } from "./components/layout/PageTransition";

import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Graphs from "./pages/Graphs";
import History from "./pages/History";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/sorting"
          element={
            <PageTransition>
              <Sorting />
            </PageTransition>
          }
        />

        <Route
          path="/graphs"
          element={
            <PageTransition>
              <Graphs />
            </PageTransition>
          }
        />

        <Route
          path="/history"
          element={
            <PageTransition>
              <History />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
