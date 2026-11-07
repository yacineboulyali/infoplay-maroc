// Serveur Réseau Local (LAN) pour InfoPlay Maroc.
// L'ordinateur hôte (souvent celui de l'enseignant) lance ce serveur ; les élèves ouvrent son adresse.
// Il sert l'application et recense les élèves connectés (présence, progression, course). Aucun accès à Internet.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 8765;
const here = path.dirname(fileURLToPath(import.meta.url));
// Fonctionne depuis scripts/ (sert ../dist) comme depuis dist/ (sert le dossier courant).
const baseDir = fs.existsSync(path.join(here, 'index.html')) ? here : fs.existsSync(path.join(here, '..', 'dist')) ? path.join(here, '..', 'dist') : path.join(here, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.gif': 'image/gif',
};
const MAX_BODY = 64 * 1024;
const ROSTER_MS = 10 * 60 * 1000; // un élève silencieux depuis 10 min est retiré de la liste
const MAX_PLAYERS = 200;

// ---------- état en mémoire ----------
const players = new Map();
const challenges = [];
const messages = [];
let race = null; // { id, label, startedAt, durationMs, baseline: { peerId: points } }

const str = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');
const num = (v, max = 1e6) => (Number.isFinite(+v) ? Math.max(0, Math.min(max, +v)) : 0);

/** Ne garde que les champs attendus, avec des tailles bornées. */
function cleanPeer(p, ip) {
  const pr = p.progress && typeof p.progress === 'object' ? p.progress : null;
  const lr = p.lastResult && typeof p.lastResult === 'object' ? p.lastResult : null;
  return {
    peerId: str(p.peerId, 60), role: p.role === 'observer' ? 'observer' : 'student',
    name: str(p.name, 30) || 'Anonyme', avatar: str(p.avatar, 8), className: str(p.className, 16),
    score: num(p.score), activity: str(p.activity, 120), activityId: str(p.activityId, 20) || null,
    progress: pr ? {
      points: num(pr.points), done: num(pr.done, 1000), total: num(pr.total, 1000), pct: num(pr.pct, 100),
      sessionsDone: num(pr.sessionsDone, 100), perfect: num(pr.perfect, 1000),
      modules: Array.isArray(pr.modules) ? pr.modules.slice(0, 8).map((m) => ({ id: num(m.id, 99), pct: num(m.pct, 100), points: num(m.points) })) : [],
    } : null,
    lastResult: lr ? { id: str(lr.id, 20), title: str(lr.title, 120), score: num(lr.score, 5), at: num(lr.at, 9e15) } : null,
    ip, lastSeen: Date.now(),
  };
}

function prune() {
  const now = Date.now();
  for (const [id, p] of players) if (now - p.lastSeen > ROSTER_MS) players.delete(id);
}

function raceView() {
  if (!race) return null;
  const remainingMs = Math.max(0, race.startedAt + race.durationMs - Date.now());
  return { id: race.id, label: race.label, durationMs: race.durationMs, remainingMs, ended: remainingMs === 0, baseline: race.baseline };
}

function state() {
  const now = Date.now();
  // ageMs : âge du dernier signal, calculé ici pour éviter les écarts d'horloge entre ordinateurs.
  return { ok: true, players: [...players.values()].map(({ lastSeen, ...p }) => ({ ...p, ageMs: now - lastSeen })), challenges, messages, race: raceView() };
}

function getLocalIPs() {
  const ips = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) for (const net of list || []) if (net.family === 'IPv4' && !net.internal) ips.push({ name, address: net.address });
  return ips;
}

function readJson(req, res, cb) {
  let body = ''; let size = 0;
  req.on('data', (chunk) => { size += chunk.length; if (size > MAX_BODY) { req.destroy(); return; } body += chunk; });
  req.on('end', () => {
    try { cb(JSON.parse(body || '{}')); } catch (e) { send(res, 400, { error: 'JSON invalide' }); }
  });
}
function send(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); }
const clientIp = (req) => String(req.socket.remoteAddress || '').replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let pathname; try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400); res.end(); return; }

  if (pathname.startsWith('/api/lan/')) {
    prune();
    if (pathname === '/api/lan/heartbeat' && req.method === 'POST') {
      return readJson(req, res, (p) => {
        if (p && typeof p.peerId === 'string' && p.peerId && (players.has(p.peerId) || players.size < MAX_PLAYERS)) {
          const peer = cleanPeer(p, clientIp(req));
          players.set(peer.peerId, peer);
          // Un élève qui arrive pendant la course part de ses points actuels.
          if (race && peer.role === 'student' && peer.progress && !(peer.peerId in race.baseline)) race.baseline[peer.peerId] = peer.progress.points;
        }
        send(res, 200, state());
      });
    }
    if (pathname === '/api/lan/state' && req.method === 'GET') return send(res, 200, state());
    if (pathname === '/api/lan/info' && req.method === 'GET') return send(res, 200, { port: PORT, ips: getLocalIPs() });
    if (pathname === '/api/lan/race' && req.method === 'POST') {
      return readJson(req, res, (b) => {
        if (b.action === 'start') {
          const minutes = Math.max(1, Math.min(120, Math.round(num(b.minutes, 120)) || 10));
          const baseline = {};
          for (const p of players.values()) if (p.role === 'student' && p.progress) baseline[p.peerId] = p.progress.points;
          race = { id: 'r' + Date.now(), label: str(b.label, 60) || 'Course InfoPlay', startedAt: Date.now(), durationMs: minutes * 60000, baseline };
        } else if (b.action === 'stop') race = null;
        send(res, 200, { ok: true, race: raceView() });
      });
    }
    if (pathname === '/api/lan/chat' && req.method === 'POST') {
      return readJson(req, res, (m) => {
        messages.unshift({ id: str(m.id, 40), peerId: str(m.peerId, 60), author: str(m.author, 30), avatar: str(m.avatar, 8), text: str(m.text, 120), time: str(m.time, 8) });
        if (messages.length > 50) messages.pop();
        send(res, 200, { ok: true });
      });
    }
    if (pathname === '/api/lan/challenge' && req.method === 'POST') {
      return readJson(req, res, (c) => {
        challenges.unshift({ id: str(c.id, 40), creatorId: str(c.creatorId, 60), creatorName: str(c.creatorName, 30), activityId: str(c.activityId, 20), title: str(c.title, 120), timestamp: num(c.timestamp, 9e15) });
        if (challenges.length > 15) challenges.pop();
        send(res, 200, { ok: true });
      });
    }
    return send(res, 404, { error: 'Endpoint inconnu' });
  }

  // ---------- fichiers statiques ----------
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(baseDir, relative);
  if (!filePath.startsWith(path.resolve(baseDir) + path.sep)) { res.writeHead(403); res.end(); return; }
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Fichier introuvable'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIPs();
  console.log('\n===============================================================');
  console.log('InfoPlay Maroc — Serveur Réseau Local (suivi et course des élèves)');
  console.log('===============================================================');
  console.log(`\nSur cet ordinateur : http://localhost:${PORT}/`);
  if (ips.length) {
    console.log('\nLes élèves de la salle ouvrent dans Chrome :');
    ips.forEach((ip) => console.log(`  -> http://${ip.address}:${PORT}/   (${ip.name})`));
    console.log('\nSuivi enseignant : ajouter  #/suivi  à la fin de l’adresse.');
    console.log('Si les autres postes n’arrivent pas à se connecter, autoriser Node.js dans le pare-feu Windows (réseau privé).');
  }
  console.log('===============================================================\n');
});
