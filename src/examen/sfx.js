// Effets sonores du module Examen, synthétisés (aucun fichier à charger) :
// clic léger, carillon montant pour une bonne réponse, « bzz » grave pour une mauvaise.
// Réglage propre au module (activé par défaut), mémorisé dans le navigateur.
const KEY = 'infoplay.examen.sfx';
let ctx = null; let out = null;

function store(fn) { try { return fn(); } catch { return null; } }
export const sfxOn = () => store(() => localStorage.getItem(KEY)) !== 'off';
export const setSfx = (on) => store(() => localStorage.setItem(KEY, on ? 'on' : 'off'));

function ac() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume().catch(() => {}); return ctx; }
  const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
  ctx = new C(); out = ctx.createGain(); out.gain.value = 0.9;
  const comp = ctx.createDynamicsCompressor(); out.connect(comp); comp.connect(ctx.destination);
  return ctx;
}
function tone(f, { at = 0, dur = 0.15, g = 0.2, type = 'sine', to = f, attack = 0.005 } = {}) {
  const a = ac(); if (!a) return;
  const t = a.currentTime + at; const o = a.createOscillator(); const v = a.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (to !== f) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  v.gain.setValueAtTime(0.0001, t); v.gain.exponentialRampToValueAtTime(g, t + attack); v.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(v); v.connect(out); o.start(t); o.stop(t + dur + 0.02);
}

const SOUNDS = {
  // « pop » court et doux
  click: () => { tone(880, { dur: 0.06, g: 0.12, type: 'triangle', to: 620 }); },
  // deux notes montantes claires (do – sol), avec une harmonique
  correct: () => {
    tone(1046.5, { dur: 0.16, g: 0.2, type: 'sine' }); tone(2093, { dur: 0.12, g: 0.05, type: 'sine' });
    tone(1568, { at: 0.11, dur: 0.32, g: 0.22, type: 'sine' }); tone(3136, { at: 0.11, dur: 0.2, g: 0.04, type: 'sine' });
  },
  // deux notes graves descendantes, un peu rugueuses
  wrong: () => {
    tone(220, { dur: 0.16, g: 0.16, type: 'square', to: 196 });
    tone(165, { at: 0.15, dur: 0.3, g: 0.16, type: 'square', to: 130 });
  },
  // ouverture d'une traduction ou d'une fenêtre
  flip: () => { tone(660, { dur: 0.08, g: 0.1, type: 'triangle', to: 990 }); },
};

export function sfx(kind) {
  if (!sfxOn()) return;
  const fn = SOUNDS[kind]; if (!fn) return;
  try { fn(); } catch { /* son indisponible : on continue sans */ }
}
