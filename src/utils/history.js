const STORAGE_KEY = "algorhythm:history";
const MAX_ENTRIES = 50;

/**
 * Estrutura de uma entrada de histórico:
 * {
 *   id:          string   (timestamp único)
 *   algorithm:   string   ('bubble' | 'selection' | ...)
 *   arraySize:   number
 *   comparisons: number
 *   swaps:       number
 *   steps:       number
 *   date:        string   (ISO)
 * }
 */

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry) {
  try {
    const history = loadHistory();
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
      ...entry,
    };

    // Mantém no máximo MAX_ENTRIES, removendo os mais antigos
    const updated = [newEntry, ...history].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch {
    return null;
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
