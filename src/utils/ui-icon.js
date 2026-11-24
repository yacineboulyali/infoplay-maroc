import { UI_ICONS } from '../data/ui-icons.js';
import { h } from './dom.js';

export function uiIcon(key, emoji, { className = '', size = 32, alt = '' } = {}) {
  const src = Object.hasOwn(UI_ICONS, key) ? UI_ICONS[key] : null;
  const icon = h('span', { class: className, 'aria-hidden': alt ? null : 'true' });
  function fallback() {
    icon.classList.remove('ui-icon');
    icon.textContent = alt || emoji || '';
  }
  if (src) {
    icon.classList.add('ui-icon');
    icon.append(h('img', {
      src, alt, width: size, height: size, loading: 'lazy', decoding: 'async', draggable: 'false', onerror: fallback,
    }));
  } else {
    fallback();
  }
  return icon;
}
