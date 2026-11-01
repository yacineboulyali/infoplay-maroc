// Sons d'interface générés localement avec Web Audio : aucun fichier ni appel réseau.
const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
let ctx = null;
let prefs = { soundEnabled: true, hoverSound: false, volume: 0.45 };

const clamp = (n) => Math.min(1, Math.max(0, Number(n) || 0));

function context() {
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function tone(freq, duration, { delay = 0, type = 'sine', gain = 0.12, endFreq = freq } = {}) {
  if (!prefs.soundEnabled || prefs.volume <= 0) return;
  const ac = context(); if (!ac) return;
  const start = ac.currentTime + delay;
  const osc = ac.createOscillator(); const amp = ac.createGain();
  osc.type = type; osc.frequency.setValueAtTime(freq, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);
  const level = gain * clamp(prefs.volume);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), start + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp); amp.connect(ac.destination); osc.start(start); osc.stop(start + duration + 0.02);
}

export const audio = {
  configure(next = {}) { prefs = { ...prefs, ...next, volume: clamp(next.volume ?? prefs.volume) }; },
  play(kind) {
    if (!prefs.soundEnabled) return;
    if (kind === 'click') tone(420, 0.055, { type: 'triangle', gain: 0.06, endFreq: 520 });
    else if (kind === 'hover' && prefs.hoverSound) tone(700, 0.035, { gain: 0.025, endFreq: 760 });
    else if (kind === 'success') { tone(523, 0.12, { gain: 0.1 }); tone(659, 0.14, { delay: 0.09, gain: 0.1 }); tone(784, 0.18, { delay: 0.18, gain: 0.11 }); }
    else if (kind === 'error') { tone(240, 0.12, { type: 'triangle', gain: 0.08, endFreq: 190 }); tone(180, 0.16, { delay: 0.1, type: 'triangle', gain: 0.07, endFreq: 150 }); }
    else if (kind === 'complete') { tone(523, 0.12, { gain: 0.09 }); tone(659, 0.14, { delay: 0.08, gain: 0.1 }); tone(784, 0.16, { delay: 0.16, gain: 0.1 }); tone(1046, 0.25, { delay: 0.26, gain: 0.12 }); }
  },
};

export function installInterfaceSounds(root = document) {
  root.addEventListener('click', (e) => {
    if (e.target.closest('button,a,[role="button"],input[type="checkbox"],input[type="radio"]')) audio.play('click');
  }, true);
  root.addEventListener('pointerover', (e) => {
    const target = e.target.closest('button,a,[role="button"]');
    if (target && !target.contains(e.relatedTarget)) audio.play('hover');
  }, true);
}
