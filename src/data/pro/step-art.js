const stepArt = {
  'm205-s1-a3': { 3: ['word-structure', 0], 7: ['word-structure', 1] },
  'm205-s3-a3': { 5: ['word-structure', 2] },
  'm205-s4-a3': { 4: ['word-structure', 3], 6: ['word-structure', 4] },
  'm205-s5-a3': {
    2: ['word-structure', 5], 3: ['word-references', 0],
    4: ['word-references', 1], 5: ['word-references', 2],
  },
  'm205-s6-a3': {
    2: ['word-references', 3], 3: ['word-references', 4], 4: ['word-references', 5],
    5: ['word-mail-form', 0], 6: ['word-mail-form', 1], 7: ['word-mail-form', 2],
  },
  'm205-s7-a3': { 3: ['word-structure', 1], 4: ['word-mail-form', 3], 8: ['word-mail-form', 4] },
  'm205-s8-a3': {
    1: ['macro-edit', 0], 2: ['macro-edit', 1],
    5: ['word-mail-form', 5], 6: ['macro-edit', 2],
  },
  'm205-s9-a3': { 1: ['macro-edit', 3], 4: ['macro-edit', 4], 6: ['macro-edit', 5] },
  'm205-s10-a3': {
    2: ['shapes-chart', 0], 3: ['shapes-chart', 1], 4: ['shapes-chart', 2],
    5: ['shapes-chart', 3], 6: ['macro-edit', 0], 7: ['shapes-chart', 4],
  },
  'm205-s11-a3': { 2: ['shapes-chart', 5], 4: ['excel-data', 0], 6: ['excel-data', 1] },
  'm205-s12-a3': { 3: ['excel-data', 2], 6: ['excel-data', 3] },
  'm205-s13-a3': {
    1: ['excel-data', 4], 2: ['excel-data', 5], 3: ['excel-review', 0],
    4: ['excel-review', 1], 5: ['excel-review', 2],
  },
  'm205-s14-a3': { 6: ['excel-review', 3] },
  'm205-s15-a3': { 2: ['excel-review', 4], 6: ['excel-review', 5] },
  'm205-s16-a3': { 1: ['office-final', 0], 4: ['macro-edit', 0], 5: ['shapes-chart', 4] },
  'm205-s17-a3': { 7: ['office-final', 1] },
  'm205-s18-a3': { 1: ['shapes-chart', 2], 2: ['shapes-chart', 3], 8: ['office-final', 2] },
  'm205-s20-a3': { 4: ['office-final', 3] },
};

export function m205StepArt(activityId, index) {
  return stepArt[activityId]?.[index + 1];
}
