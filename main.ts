// The One-Line Laugh — entry program (program/v1).
//
// Running this file writes exactly one funny line to /output/entry.txt,
// which is the only artifact the contest gate and judge ever read.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const ENTRY_PATH = join(OUTPUT_DIR, "entry.txt");

// The joke: a smart fridge, checked once too often in the small hours,
// stops hinting and takes legal action against its own owner.
const LINE =
  "My smart fridge filed a restraining order after I checked it fourteen times at 3 a.m. hoping dinner had changed its mind.";

// The grader mounts /output as a mount point, so this prepares the
// directory by clearing its CONTENTS only. The directory itself is
// never removed: deleting a mount point throws EBUSY and the run dies
// before it writes anything.
function prepareOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

// The contest gate refuses any text over 200 characters, so the line is
// measured before anything is written: a line that somehow grew past the
// cap fails loudly here instead of silently scoring zero out there.
const MAX_LINE_CHARS = 200;

function checkLine(line: string): void {
  if (line.length === 0 || line.length > MAX_LINE_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters; the gate allows 1-${MAX_LINE_CHARS}`,
    );
  }
}

function main(): void {
  checkLine(LINE);
  prepareOutputDir(OUTPUT_DIR);
  writeFileSync(ENTRY_PATH, LINE + "\n", "utf8");
}

main();
