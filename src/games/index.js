import { matchGame, sortGame, orderGame, fillGame, quizGame } from './basic.js';
import { hotspotGame } from './hotspot.js';
import { asmGame, netGame } from './structure.js';
import { robotGame } from './robot.js';
import { progGame } from './prog.js';
import { simGame } from './sims.js';

export const ENGINES = { match: matchGame, sort: sortGame, order: orderGame, fill: fillGame, quiz: quizGame, hot: hotspotGame, asm: asmGame, net: netGame, robot: robotGame, prog: progGame, sim: simGame };
export const engineOf = (mech) => ENGINES[mech.split(':')[0]];
