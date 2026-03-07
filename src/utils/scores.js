const STORAGE_KEY = 'numberCannon_scores';
const MAX_RECORDS = 50;

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_RECORDS)));
  } catch {}
}

export function saveScore({ mode, name, score, kills, maxCombo, missed, locks, result }) {
  const records = loadAll();
  records.push({
    mode,
    name,
    score,
    kills,
    maxCombo,
    missed,
    locks,
    result,
    date: Date.now(),
  });
  records.sort((a, b) => b.score - a.score);
  saveAll(records);
}

export function getScores(mode) {
  const all = loadAll();
  if (mode) return all.filter(r => r.mode === mode);
  return all;
}

export function clearScores() {
  localStorage.removeItem(STORAGE_KEY);
}
