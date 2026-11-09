import { h } from './dom.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';

// Index by source item, never by its current position in a shuffled list.
export function studentIllustration(data, index, variant = '') {
  if (data.itemPicture) return data.itemPicture(index, variant);
  if (!data.illustrationActivityId || !Number.isInteger(index) || index < 0) return null;
  const id = `${data.illustrationActivityId}-q${String(index + 1).padStart(2, '0')}`;
  const src = STUDENT_ILLUSTRATIONS[id];
  if (!src) return null;
  return h('img', {
    class: `student-illustration ${variant}`.trim(), src, alt: '',
    'aria-hidden': 'true', 'data-question-id': id,
    width: 512, height: 512, loading: 'lazy', decoding: 'async', draggable: 'false',
    onerror: (event) => event.currentTarget.remove(),
  });
}
