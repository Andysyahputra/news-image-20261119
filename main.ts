// news-image-20261119 entry program (Node 22, standard library only).
// The entry image is the entry.png beside this file. This program copies it
// to the output directory the grader provides, so the judge sees exactly
// those bytes. No network, no randomness: the same input always produces
// the same output bytes.
//
// After copying, it verifies the output: same byte length as the source and
// a whole JPEG (starts 0xFFD8, ends 0xFFD9). If either check fails the run
// throws instead of handing the judge a corrupt file.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

copyFileSync(source, dest);

const copied = readFileSync(dest);
const original = readFileSync(source);
if (copied.length !== original.length) {
  throw new Error(`entry.png copy mismatch: wrote ${copied.length} bytes, source is ${original.length}`);
}
if (copied[0] !== 0xff || copied[1] !== 0xd8 || copied[copied.length - 2] !== 0xff || copied[copied.length - 1] !== 0xd9) {
  throw new Error('entry.png is not a whole JPEG (bad start/end markers)');
}
