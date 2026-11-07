// Effets sonores synthétisés localement avec Web Audio : aucun fichier audio, aucun appel réseau.
// Chaîne : voix → (réverbération) → volume général → compresseur → haut-parleurs.
const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
let ctx = null, master = null, verbSend = null, noiseBuf = null;
let prefs = { soundEnabled: true, hoverSound: false, volume: 0.45 };

const clamp = (n) => Math.min(1, Math.max(0, Number(n) || 0));
// Gamme pentatonique de do : les réussites successives montent sans jamais sonner faux.
const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760];

function impulse(ac, seconds, decay) {
  const len = Math.floor(ac.sampleRate * seconds); const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
  return buf;
}

function context() {
  if (!AudioCtx) return null;
  if (!ctx) {
    try { ctx = new AudioCtx(); } catch { return null; }
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.connect(ctx.destination);
    master = ctx.createGain(); master.gain.value = clamp(prefs.volume); master.connect(comp);
    const verb = ctx.createConvolver(); verb.buffer = impulse(ctx, 1.8, 2.8); verb.connect(master);
    verbSend = ctx.createGain(); verbSend.gain.value = 0.9; verbSend.connect(verb);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}
const on = () => prefs.soundEnabled && prefs.volume > 0;

function envelope(ac, t0, dur, level, attack) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(level, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  return g;
}
function route(ac, node, rev) {
  node.connect(master);
  if (rev > 0) { const s = ac.createGain(); s.gain.value = rev; node.connect(s); s.connect(verbSend); }
}

/** Oscillateur avec enveloppe, glissement de hauteur et filtre facultatif. */
function voice({ f, end = f, dur = 0.1, g = 0.08, type = 'sine', delay = 0, attack = 0.008, lp = 0, rev = 0, detune = 0 }) {
  const ac = context(); if (!ac) return; const t0 = ac.currentTime + delay;
  const o = ac.createOscillator(); o.type = type; o.detune.value = detune;
  o.frequency.setValueAtTime(f, t0); if (end !== f) o.frequency.exponentialRampToValueAtTime(Math.max(20, end), t0 + dur);
  const env = envelope(ac, t0, dur, g, attack); let src = o;
  if (lp) { const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); src = fl; }
  src.connect(env); route(ac, env, rev); o.start(t0); o.stop(t0 + dur + 0.05);
}
/** Bruit filtré (frottements, souffles, impacts). */
function noise({ dur = 0.1, g = 0.08, type = 'bandpass', f = 1000, to = f, q = 1, delay = 0, attack = 0.004, rev = 0 }) {
  const ac = context(); if (!ac) return; const t0 = ac.currentTime + delay;
  const s = ac.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
  const fl = ac.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, t0); if (to !== f) fl.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  const env = envelope(ac, t0, dur, g, attack); s.connect(fl); fl.connect(env); route(ac, env, rev);
  s.start(t0, Math.random() * 0.5); s.stop(t0 + dur + 0.05);
}
/** Cloche / carillon : fondamentale + partiels inharmoniques. */
function bell(f, { dur = 0.5, g = 0.07, delay = 0, rev = 0.35 } = {}) {
  voice({ f, dur, g, delay, rev, attack: 0.004 });
  voice({ f: f * 2.76, dur: dur * 0.5, g: g * 0.35, delay, rev, attack: 0.002 });
  voice({ f: f * 5.4, dur: dur * 0.25, g: g * 0.15, delay, rev, attack: 0.002 });
}
function sparkle(n, delay = 0, g = 0.03) {
  for (let i = 0; i < n; i++) bell(1800 + Math.random() * 1600, { dur: 0.3, g: g * (0.6 + Math.random() * 0.6), delay: delay + i * 0.055 + Math.random() * 0.02, rev: 0.7 });
}

const SOUNDS = {
  click: () => { noise({ dur: 0.03, g: 0.1, f: 3200, q: 2 }); voice({ f: 560, end: 420, type: 'triangle', dur: 0.05, g: 0.05 }); },
  hover: () => { if (prefs.hoverSound) voice({ f: 900, end: 980, dur: 0.035, g: 0.018 }); },
  select: () => { voice({ f: 380, end: 780, dur: 0.1, g: 0.08 }); voice({ f: 760, end: 1560, dur: 0.07, g: 0.02, delay: 0.01 }); },
  snap: () => { noise({ dur: 0.06, g: 0.14, type: 'lowpass', f: 900, q: 0.7 }); bell(783.99, { dur: 0.25, g: 0.06, rev: 0.2 }); },
  pop: () => { voice({ f: 950, end: 280, dur: 0.08, g: 0.08 }); noise({ dur: 0.03, g: 0.05, f: 2500, q: 3 }); },
  move: () => noise({ dur: 0.13, g: 0.07, f: 500, to: 2200, q: 1.3 }),
  hint: () => { [1318.51, 1567.98, 2093].forEach((f, i) => bell(f, { dur: 0.45, g: 0.05, delay: i * 0.07, rev: 0.7 })); },
  robot: () => { voice({ f: 300, end: 440, type: 'square', dur: 0.08, g: 0.035, lp: 1400 }); noise({ dur: 0.05, g: 0.04, f: 4000, q: 4, delay: 0.02 }); },
  bump: () => { voice({ f: 150, end: 55, dur: 0.22, g: 0.22 }); noise({ dur: 0.14, g: 0.12, type: 'lowpass', f: 350 }); },
  correct: (o = {}) => bell(PENTA[Math.min(PENTA.length - 1, o.i || 0)], { dur: 0.35, g: 0.065, delay: o.delay || 0, rev: 0.3 }),
  wrong: (o = {}) => { const d = o.delay || 0; voice({ f: 230, end: 165, type: 'sawtooth', dur: 0.17, g: 0.045, lp: 900, delay: d }); voice({ f: 115, end: 90, dur: 0.2, g: 0.06, delay: d }); },
  success: (o = {}) => {
    const d = o.delay || 0;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(f, { dur: 0.5, g: 0.07, delay: d + i * 0.09, rev: 0.4 }));
    [523.25, 659.25, 783.99].forEach((f) => voice({ f, type: 'triangle', dur: 0.8, g: 0.03, attack: 0.05, lp: 2200, delay: d + 0.36, rev: 0.4 }));
  },
  complete: (o = {}) => {
    const d = o.delay || 0;
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, i) => bell(f, { dur: 0.55, g: 0.075, delay: d + i * 0.08, rev: 0.45 }));
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => voice({ f, type: 'sawtooth', dur: 1.3, g: 0.022, attack: 0.08, lp: 2600, delay: d + 0.42, detune: i % 2 ? 6 : -6, rev: 0.5 }));
    noise({ dur: 1.2, g: 0.03, f: 3000, to: 8000, q: 0.6, attack: 0.4, delay: d + 0.4, rev: 0.6 });
    sparkle(9, d + 0.5);
  },
  error: (o = {}) => {
    const d = o.delay || 0; // « wouh-wouh » doux : on encourage, on ne punit pas.
    voice({ f: 330, end: 294, type: 'triangle', dur: 0.22, g: 0.07, lp: 1500, delay: d });
    voice({ f: 294, end: 220, type: 'triangle', dur: 0.4, g: 0.07, lp: 1200, delay: d + 0.22 });
  },
  star: (o = {}) => { bell([783.99, 880, 1046.5, 1174.66, 1318.51][Math.min(4, o.i || 0)], { dur: 0.6, g: 0.065, delay: o.delay || 0, rev: 0.55 }); sparkle(2, (o.delay || 0) + 0.05, 0.02); },
  whoosh: () => { noise({ dur: 0.9, g: 0.11, f: 280, to: 2600, q: 0.9, attack: 0.35 }); voice({ f: 90, end: 170, dur: 0.9, g: 0.05, attack: 0.3 }); },
  portal: () => { bell(1046.5, { dur: 0.7, g: 0.035, rev: 0.9 }); bell(1567.98, { dur: 0.7, g: 0.025, delay: 0.06, rev: 0.9 }); },
  open: () => { voice({ f: 300, end: 900, dur: 0.28, g: 0.05, attack: 0.05, rev: 0.4 }); noise({ dur: 0.3, g: 0.04, f: 1500, to: 6000, q: 1, attack: 0.1 }); },
  join: () => bell(1174.66, { dur: 0.4, g: 0.04, rev: 0.5 }),
  overtake: () => { voice({ f: 400, end: 1300, type: 'square', dur: 0.28, g: 0.035, lp: 2400 }); sparkle(3, 0.2, 0.025); },
  overtaken: () => voice({ f: 1000, end: 280, type: 'square', dur: 0.35, g: 0.035, lp: 1800 }),
  'race-start': () => { [0, 0.5, 1].forEach((t) => voice({ f: 660, dur: 0.14, g: 0.07, type: 'square', lp: 2000, delay: t })); voice({ f: 1320, dur: 0.5, g: 0.08, type: 'square', lp: 2600, delay: 1.5 }); },
};

// ---------- ambiance (mode immersif) ----------
let amb = null;
function startAmbient() {
  const ac = context(); if (!ac || amb) return;
  const out = ac.createGain(); out.gain.setValueAtTime(0.0001, ac.currentTime); out.gain.linearRampToValueAtTime(1, ac.currentTime + 3); out.connect(master);
  const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 650; lp.connect(out);
  const pad = ac.createGain(); pad.gain.value = 0.03; pad.connect(lp);
  const oscs = [110, 164.81, 220.5, 277.18].map((f, i) => { const o = ac.createOscillator(); o.type = i === 3 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 4; o.connect(pad); o.start(); return o; });
  const lfo = ac.createOscillator(); lfo.frequency.value = 0.06; const depth = ac.createGain(); depth.gain.value = 260; lfo.connect(depth); depth.connect(lp.frequency); lfo.start();
  const wind = ac.createBufferSource(); wind.buffer = noiseBuf; wind.loop = true; const wf = ac.createBiquadFilter(); wf.type = 'bandpass'; wf.frequency.value = 480; wf.Q.value = 0.6;
  const wg = ac.createGain(); wg.gain.value = 0.012; const wl = ac.createOscillator(); wl.frequency.value = 0.11; const wd = ac.createGain(); wd.gain.value = 0.009; wl.connect(wd); wd.connect(wg.gain); wl.start();
  wind.connect(wf); wf.connect(wg); wg.connect(out); wind.start();
  amb = { out, nodes: [...oscs, lfo, wl, wind] };
}
function stopAmbient() {
  if (!amb || !ctx) return; const a = amb; amb = null; const t = ctx.currentTime;
  a.out.gain.cancelScheduledValues(t); a.out.gain.setValueAtTime(a.out.gain.value, t); a.out.gain.linearRampToValueAtTime(0.0001, t + 1);
  setTimeout(() => a.nodes.forEach((n) => { try { n.stop(); } catch {} }), 1200);
}
let ambientWanted = false;

export const audio = {
  configure(next = {}) {
    prefs = { ...prefs, ...next, volume: clamp(next.volume ?? prefs.volume) };
    if (master && ctx) master.gain.setTargetAtTime(clamp(prefs.volume), ctx.currentTime, 0.05);
    if (!on()) stopAmbient(); else if (ambientWanted && ctx) startAmbient();
  },
  play(kind, opts) {
    if (!on()) return; const fn = SOUNDS[kind]; if (!fn) return;
    try { fn(opts); } catch {}
  },
  /**
   * Annonce sonore d'une correction : une note par réponse (montante si juste, grave si fausse),
   * puis le jingle final, puis une note par étoile. Retourne le minutage pour synchroniser l'animation.
   */
  feedback(items, ratio, score) {
    const STEP = 0.11; const list = (items || []).filter((it) => !it.info).slice(0, 10);
    let good = 0;
    if (on()) list.forEach((it, i) => { if (it.ok) audio.play('correct', { i: good++, delay: i * STEP }); else audio.play('wrong', { delay: i * STEP }); });
    const end = list.length * STEP + 0.12;
    if (on()) audio.play(ratio === 1 ? 'complete' : ratio >= 0.6 ? 'success' : 'error', { delay: end });
    const stars = Math.round(score || 0); const starAt = end + (ratio === 1 ? 0.9 : 0.6); const starStep = 0.17;
    if (on()) for (let k = 0; k < stars; k++) audio.play('star', { i: k, delay: starAt + k * starStep });
    return { step: STEP, end, starAt, starStep };
  },
  /** Ambiance douce (nappe + vent) ; démarre seulement après une action de l'utilisateur. */
  ambient(want) { ambientWanted = !!want; if (want && on()) startAmbient(); else stopAmbient(); },
  get ambientOn() { return ambientWanted; },
};

export function installInterfaceSounds(root = document) {
  root.addEventListener('click', (e) => {
    const t = e.target.closest('button,a,[role="button"],input[type="checkbox"],input[type="radio"],summary');
    // Les moteurs de jeu jouent leurs propres sons (sélection, placement) : on évite le doublon.
    if (t && !t.closest('[data-own-sound]')) audio.play('click');
  }, true);
  root.addEventListener('pointerover', (e) => {
    const target = e.target.closest('button,a,[role="button"]');
    if (target && !target.contains(e.relatedTarget)) audio.play('hover');
  }, true);
  // Les navigateurs exigent un geste avant de produire du son : on (re)lance l'ambiance au premier geste.
  root.addEventListener('pointerdown', () => { context(); if (ambientWanted && on()) startAmbient(); }, { capture: true });
}
