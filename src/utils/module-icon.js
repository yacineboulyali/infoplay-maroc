import { MODULE_ICONS } from '../data/module-icons.js';
import { h } from './dom.js';

// Icône illustrée d'un module ; l'emoji reste en repli si l'image manque ou ne charge pas.
export function moduleIcon(key, emoji, className = 'pp-ico') {
  const src = Object.hasOwn(MODULE_ICONS, key) ? MODULE_ICONS[key] : null;
  const icon = h('span', { class: className, 'aria-hidden': 'true' });
  if (!src) {
    icon.textContent = emoji;
    return icon;
  }

  icon.classList.add('module-icon');
  icon.append(h('img', {
    src, alt: '', width: 48, height: 48, loading: 'lazy', decoding: 'async', draggable: 'false',
    onerror: () => {
      icon.classList.remove('module-icon');
      icon.textContent = emoji;
    },
  }));
  return icon;
}
