import { PRIMES, MONSTER_TYPES, COLS } from './constants.js';

let nextId = 1;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function createMonster(type, existingMonsters) {
  const config = MONSTER_TYPES[type];
  const factors = [];
  let value = 1;
  for (let i = 0; i < config.factorCount; i++) {
    const p = pickRandom(PRIMES);
    factors.push(p);
    value *= p;
  }

  const blockedCols = new Set();
  for (const m of existingMonsters) {
    if (m.row === 0) blockedCols.add(m.col);
    if (m.dying && m.row <= 1) blockedCols.add(m.col);
  }

  let col;
  const freeCols = [];
  for (let c = 0; c < COLS; c++) {
    if (!blockedCols.has(c)) freeCols.push(c);
  }

  if (freeCols.length > 0) {
    col = pickRandom(freeCols);
  } else {
    col = Math.floor(Math.random() * COLS);
  }

  return {
    id: nextId++,
    type,
    col,
    row: 0,
    value,
    factors,
    pts: config.pts,
    fallMs: config.fallMs,
    fallAcc: 0,
    hitFlash: 0,
  };
}
