import { h, svgFrom } from '../utils/dom.js';
import { SCENES, regionIds } from './scenes.js';
import { audio } from '../audio/audio.js';
import { studentIllustration } from '../utils/student-illustrations.js';
import { arHint } from '../i18n/arhint.js';
import { arQuestion } from '../i18n/ar-questions.js';

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
  let figure, case3d = null, regionButtons = [], desc = {}, ids = [];

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
    if (d.scene === 'pc') {
      const wall = (side) => h('div', { class: 'case-wall ' + side, 'aria-hidden': 'true' });
      case3d = h('div', { class: 'figure case3d hot-case' }, wall('l'), wall('r'), wall('t'), wall('b'), svg);
      case3d.style.transform = 'rotateY(-16deg) rotateX(9deg)';
      const rot = h('input', { type: 'range', min: '-36', max: '36', value: '-16', 'aria-label': 'Faire pivoter la vue du boîtier', oninput: () => { case3d.style.transform = `rotateY(${rot.value}deg) rotateX(9deg)`; } });
      figure = h('div', { class: 'hot-3d' }, h('div', { class: 'stage' }, case3d), h('label', { class: 'rot' }, 'Vue : ', rot));
    } else figure = h('div', { class: 'figure' }, svg);
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

  // ---- Glisser une consigne sur l'élément de l'image (souris, doigt, stylet) ; le clic reste possible ----
  let drag = null; let justDragged = false;
  const regionAt = (x, y) => { const el = document.elementFromPoint(x, y); const g = el && el.closest('[data-r]'); return g && root.contains(g) ? g : null; };
  const mark = (g) => root.querySelectorAll('[data-r].drag-over').forEach((n) => { if (n !== g) n.classList.remove('drag-over'); }) || (g && g.classList.add('drag-over'));
  function startDrag(e, i) {
    if (e.button || d.scene === 'lines') return;
    drag = { i, sx: e.clientX, sy: e.clientY, ghost: null, src: e.currentTarget.closest('li') };
    window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onCancel);
  }
  function onMove(e) {
    if (!drag) return;
    if (!drag.ghost) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 7) return;
      drag.ghost = h('div', { class: 'hot-ghost', 'aria-hidden': 'true' }, h('b', null, drag.i + 1), prompts[drag.i][1]);
      document.body.append(drag.ghost); drag.src.classList.add('dragging'); audio.play('select');
    }
    drag.ghost.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
    mark(regionAt(e.clientX, e.clientY)); e.preventDefault();
  }
  function stop() { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onCancel); if (drag && drag.ghost) drag.ghost.remove(); if (drag) drag.src.classList.remove('dragging'); mark(null); }
  function onCancel() { stop(); drag = null; }
  function onUp(e) {
    const g = drag; stop(); drag = null; if (!g || !g.ghost) return; // simple clic : géré par onclick
    justDragged = true; setTimeout(() => { justDragged = false; }, 0);
    const region = regionAt(e.clientX, e.clientY);
    if (region) { cur = g.i; pick(region.getAttribute('data-r')); } else { live.textContent = 'Dépose la consigne sur un élément de l’image.'; }
  }

  function draw() {
    list.replaceChildren(...prompts.map((p, i) => h('li', { class: i === cur ? 'cur' : '' },
      d.scene === 'lines' ? null : h('span', { class: 'drag-grip', 'aria-hidden': 'true', title: 'Glisser vers l’image', onpointerdown: (e) => startDrag(e, i) }, '⠿'),
      h('button', {
        type: 'button',
        class: 'prompt-btn',
        'aria-current': i === cur ? 'step' : null,
        onpointerdown: (e) => { if (e.pointerType === 'mouse') startDrag(e, i); },
        onclick: () => { if (justDragged) return; cur = i; audio.play('select'); draw(); },
      }, studentIllustration(d, i), p[1]),
      arHint(arQuestion(d.illustrationActivityId, i)),
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
        h('p', { class: 'muted' }, d.scene === 'lines' ? '👉 Clique directement sur l’élément correspondant dans l’image ci-contre.' : '👉 Fais glisser chaque consigne sur l’élément correspondant de l’image, ou clique directement dessus.'),
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
