import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { ACTIVITIES, COLLEGE_ACTIVITIES, isActivityId } from '../src/data/index.js';
import { ACTIVITY_CARDS } from '../src/data/activity-cards.js';
import { STUDENT_ILLUSTRATIONS } from '../src/data/student-illustrations.js';

const publicDir = new URL('../public/', import.meta.url);
const studentKeys = Object.keys(STUDENT_ILLUSTRATIONS);
// Le lot de vignettes 2AC est encore en cours de production.
const collegeWithCompleteCards = COLLEGE_ACTIVITIES.filter(({ moduleId }) => moduleId < 21 || moduleId > 25);

test('Les activités du Tronc Commun, du 1AC et du 3AC ont toutes une vignette locale', () => {
  for (const activity of [...ACTIVITIES, ...collegeWithCompleteCards]) {
    const key = activity.pics?.find(Boolean) || studentKeys.find((candidate) => candidate.startsWith(`${activity.illus || activity.id}-q`));
    const path = key ? STUDENT_ILLUSTRATIONS[key] : ACTIVITY_CARDS[activity.id];
    assert.ok(path && existsSync(new URL(path, publicDir)), `${activity.id} : vignette introuvable`);
  }
});

test('Les vignettes dédiées pointent vers des activités et des fichiers existants', () => {
  for (const [id, path] of Object.entries(ACTIVITY_CARDS)) {
    assert.ok(isActivityId(id), `${id} : activité inconnue`);
    assert.ok(existsSync(new URL(path, publicDir)), `${id} : fichier introuvable (${path})`);
  }
});
