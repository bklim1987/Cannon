let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function getPan(side) {
  return side === 'A' ? -0.7 : 0.7;
}

function getPitch(side) {
  return side === 'A' ? 1.15 : 0.85;
}

function playToneAt(freq, duration, type, volume, pan, startTime) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const panner = c.createStereoPanner();

  osc.type = type;
  osc.frequency.value = freq;
  panner.pan.value = pan;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(panner);
  panner.connect(c.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playHit(side) {
  const c = getCtx();
  const pan = getPan(side);
  const pitch = getPitch(side);
  playToneAt(600 * pitch, 0.06, 'sine', 0.15, pan, c.currentTime);
}

export function playMiss(side) {
  const c = getCtx();
  const pan = getPan(side);
  const pitch = getPitch(side);
  playToneAt(150 * pitch, 0.15, 'square', 0.2, pan, c.currentTime);
}

export function playKill(side, isBoss = false) {
  const c = getCtx();
  const pan = getPan(side);
  const pitch = getPitch(side);
  const t = c.currentTime;

  playToneAt(500 * pitch, 0.05, 'sine', 0.25, pan, t);
  playToneAt(750 * pitch, 0.05, 'sine', 0.25, pan, t + 0.08);

  if (isBoss) {
    playToneAt(1000 * pitch, 0.08, 'sine', 0.3, pan, t + 0.16);
  }
}
