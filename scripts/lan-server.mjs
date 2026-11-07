// Serveur Réseau Local (LAN) pour InfoPlay Maroc.
// Supporte le jeu multijoueur sur tout le réseau local (Wi-Fi ou Ethernet) sans Internet.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const PORT = 8765;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const baseDir = fs.existsSync(distDir) ? distDir : root;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

// État mémoire du réseau local
const players = new Map();
const challenges = [];
const messages = [];

function prunePeers() {
  const now = Date.now();
  for (const [id, p] of players.entries()) {
    if (now - (p.lastSeen || 0) > 12000) {
      players.delete(id);
    }
  }
}

function getLocalIPs() {
  const ips = [];
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push({ name, address: net.address });
      }
    }
  }
  return ips;
}

const server = http.createServer((req, res) => {
  // CORS pour réseau local
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  // ---------- API LAN MULTIJOUEUR ----------
  if (pathname.startsWith('/api/lan/')) {
    prunePeers();

    if (pathname === '/api/lan/heartbeat' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const peer = JSON.parse(body);
          if (peer && peer.peerId) {
            peer.lastSeen = Date.now();
            players.set(peer.peerId, peer);
          }
          const playerList = Array.from(players.values());
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, players: playerList, challenges, messages }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    if (pathname === '/api/lan/state' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        players: Array.from(players.values()),
        challenges,
        messages,
      }));
      return;
    }

    if (pathname === '/api/lan/chat' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const msg = JSON.parse(body);
          messages.unshift(msg);
          if (messages.length > 50) messages.pop();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    if (pathname === '/api/lan/challenge' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const ch = JSON.parse(body);
          challenges.unshift(ch);
          if (challenges.length > 15) challenges.pop();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint inconnu' }));
    return;
  }

  // ---------- FICHIERS STATIQUES ----------
  let relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = path.join(baseDir, relative);

  // Fallback vers root si non trouvé dans dist
  if (!fs.existsSync(filePath) && baseDir !== root) {
    filePath = path.join(root, relative);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Fichier introuvable');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIPs();
  console.log('\n===============================================================');
  console.log('🎮 InfoPlay Maroc — Serveur Multijoueur Réseau Local');
  console.log('Créateur du jeu : ياسين بوجيالي (Yassine Boudjiali)');
  console.log('===============================================================');
  console.log(`\nSur cet ordinateur : http://localhost:${PORT}/`);
  if (ips.length) {
    console.log('\nPour jouer à plusieurs sur le même réseau (Wi-Fi / LAN) :');
    ips.forEach((ip) => {
      console.log(`  👉 http://${ip.address}:${PORT}/   (Interface : ${ip.name})`);
    });
    console.log('\nDonne cette adresse aux autres ordinateurs pour qu\'ils rejoignent !');
  }
  console.log('===============================================================\n');
});
