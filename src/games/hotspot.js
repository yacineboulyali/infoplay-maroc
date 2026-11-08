import { h, svgFrom } from '../utils/dom.js';
import { SCENES, regionIds } from './scenes.js';
import { audio } from '../audio/audio.js';
import { studentIllustration } from '../utils/student-illustrations.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function shapeMarkup(s) {
  const [t] = s;
  if (t === 'defs') return `<defs>${s[1]}</defs>`;
  if (t === 'raw') return `<g class="reg"${s[1] ? ` data-r="${s[1]}"` : ''}>${s[2]}</g>`;
  if (t === 't') return `<text class="svt ${s[5]}" x="${s[1]}" y="${s[2]}" font-size="${s[4]}">${esc(s[3])}</text>`;
  const id = s[1] ? ` data-r="${s[1]}"` : '';
  if (t === 'r') {
    const [, , x, y, w, hh, cls, text, fs] = s;
    const rx = cls === 'c0' || !cls ? 4 : 6;
    return `<g class="reg"${id}><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="${rx}" class="sv ${cls || ''}"/>${text ? `<text class="svt" x="${x + w / 2}" y="${y + hh / 2}" font-size="${fs || 14}" text-anchor="middle" dominant-baseline="central">${esc(text)}</text>` : ''}</g>`;
  }
  if (t === 'c') {
    const [, , x, y, r, cls, text, fs] = s;
    return `<g class="reg"${id}><circle cx="${x}" cy="${y}" r="${r}" class="sv ${cls || ''}"/>${text ? `<text class="svt" x="${x}" y="${y}" font-size="${fs || 14}" text-anchor="middle" dominant-baseline="central">${esc(text)}</text>` : ''}</g>`;
  }
  if (t === 'l') {
    const [, , x1, y1, x2, y2, cls] = s;
    return `<g class="reg"${id}>${s[1] ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="hit"/>` : ''}<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="svl ${cls || ''}"/></g>`;
  }
  if (t === 'p') return `<g class="reg"${id}><path d="${s[2]}" class="sv ${s[3] || ''}"/></g>`;
  return '';
}

export function hotspotGame(root, d) {
  const prompts = d.prompts;
  const n = prompts.length;
  const ans = Array(n).fill(null);
  let cur = 0;
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const list = h('ol', { class: 'prompts' });
  let figure, regionButtons = [], desc = {}, ids = [];

  if (d.scene === 'lines') {
    ids = d.lines.map((_, i) => 'l' + (i + 1));
    desc = Object.fromEntries(ids.map((id, i) => [id, 'Ligne ' + (i + 1)]));
    figure = h('div', { class: 'codebox', role: 'group', 'aria-label': 'Programme' },
      d.lines.map((ln, i) => h('button', {
        type: 'button',
        class: 'codeline',
        'data-r': ids[i],
        onclick: () => pick(ids[i]),
      }, h('span', { class: 'ln' }, i + 1), h('code', null, ln)))
    );
  } else {
    const sc = SCENES[d.scene];
    ids = regionIds(sc);
    desc = sc.desc;
    const svg = svgFrom(`<svg viewBox="0 0 ${sc.w} ${sc.h}" class="scene" role="img" aria-label="${esc(sc.alt)}">${sc.shapes.map(shapeMarkup).join('')}</svg>`);
    svg.addEventListener('click', (e) => {
      const g = e.target.closest('[data-r]');
      if (g) pick(g.getAttribute('data-r'));
    });
    figure = h('div', { class: 'figure' }, svg);
    regionButtons = ids.map((id, k) => h('button', {
      type: 'button',
      class: 'chip',
      'data-z': id,
      onclick: () => pick(id),
    }, `Zone ${k + 1} : ${desc[id]}`));
  }

  const zoneName = (id) => (d.scene === 'lines' ? desc[id] : 'Zone ' + (ids.indexOf(id) + 1));

  function pick(id) {
    ans[cur] = id;
    audio.play('click');
    const nx = ans.findIndex((a, i) => a == null && i !== cur);
    cur = nx >= 0 ? nx : cur;
    live.textContent = 'Réponse enregistrée : ' + zoneName(id) + '.';
    draw();
  }

  function draw() {
    list.replaceChildren(...prompts.map((p, i) => h('li', { class: i === cur ? 'cur' : '' },
      h('button', {
        type: 'button',
        class: 'prompt-btn',
        'aria-current': i === cur ? 'step' : null,
        onclick: () => { cur = i; audio.play('select'); draw(); },
      }, studentIllustration(d, i), p[1]),
      h('span', { class: 'ans' }, ans[i] ? zoneName(ans[i]) : '—')
    )));
    root.querySelectorAll('[data-r]').forEach((g) => {
      const r = g.getAttribute('data-r');
      g.classList.toggle('chosen', ans.includes(r));
      g.classList.toggle('active', ans[cur] === r);
    });
  }

  root.append(
    h('div', { class: 'hot' },
      h('div', null,
        figure,
        d.scene === 'lines' ? null : h('details', { class: 'alt' },
          h('summary', null, 'Liste des zones (alternative accessible)'),
          h('div', { class: 'chips' }, regionButtons)
        )
      ),
      h('div', null,
        h('p', { class: 'muted' }, '👉 Clique directement sur l’élément correspondant dans l’image ci-contre.'),
        list
      )
    ),
    live
  );
  draw();

  return {
    check() {
      const items = prompts.map((p, i) => {
        const ok = ans[i] === p[0];
        return {
          ok,
          msg: `${p[1]} → ${desc[p[0]] || p[0]}.` + (p[2] ? ' ' + p[2] : ''),
        };
      });
      return {
        correct: items.filter((x) => x.ok).length,
        total: n,
        items,
        unanswered: ans.filter((a) => a == null).length,
      };
    },
    reveal(res) {
      list.querySelectorAll('li').forEach((li, i) => {
        li.classList.add(res.items[i].ok ? 'ok' : 'ko');
      });
    },
    solve() {
      prompts.forEach((p, i) => { ans[i] = p[0]; });
      draw();
    },
  };
}
