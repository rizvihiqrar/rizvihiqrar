// Draws the profile README's workflow (an AI-driven development lifecycle) as SVG
// in the CI dashboard's colours, one file per theme. Run: node workflow-svg.mjs <dir>
import fs from 'node:fs';

// Dashboard tokens, with the muted grey and the red darkened for small text.
const THEMES = {
  light: { page: '#f9f9f7', surface: '#ffffff', ring: 'rgba(11,11,11,0.12)', text: '#0b0b0b', secondary: '#3d3c39', muted: '#52514e', blue: '#2a78d6', track: '#cde2fb', trackText: '#123d73', bad: '#b3261e', good: '#0b8a0b', band: '#ecebe5' },
  dark:  { page: '#0d0d0d', surface: '#1a1a19', ring: 'rgba(255,255,255,0.14)', text: '#f0efec', secondary: '#dcdbd3', muted: '#c3c2b7', blue: '#5b9ef0', track: '#184f95', trackText: '#e3eefc', bad: '#ff8a80', good: '#3fc43f', band: '#232321' },
};

const STEPS = [
  ['Requirements', ['Gaps fixed', 'before any code'], 'reviewed spec'],
  ['AI writes code', ['Builds from the', 'reviewed spec'], 'Claude Code'],
  ['Quick checks', ['Unit, API, k6,', 'browser smoke'], '~1.5 min'],
  ['Human review', ['Reads it against', 'the spec, merges'], 'people decide'],
  ['Full test run', ['Every suite, on', 'main and nightly'], '~1,030 checks'],
  ['Results live', ['Dashboard and', 'test reports'], 'published'],
];
const PHASES = [['Inception', 'Specs before code', 0, 0], ['Construction', 'AI builds, tests prove it', 1, 3], ['Operations', 'Run, watched, released', 4, 5]];
const LOOP = [2, 1], GATE = 4;

const FONT = 'system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif';
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
// Rough width of system-font text; shrinks text that wouldn't fit its card.
const fit = (s, size, max) => Math.min(size, max / (s.length * 0.53));

function svg(t) {
  const n = STEPS.length, W = 1000, X0 = 14, GAP = 16;
  const CARD_W = (W - 2 * X0 - (n - 1) * GAP) / n, CARD_H = 158, Y0 = 78;
  const cardX = (i) => X0 + i * (CARD_W + GAP);
  const by = Y0 + CARD_H + 4, loopY = by + 42, gy = by + 62, gh = 64, H = gy + gh + 16;
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`);
  out.push(`<title id="title">An AI-driven development lifecycle</title>`);
  out.push(`<desc id="desc">Inception: requirements are reviewed and gaps fixed before any code. Construction: AI writes the code from the reviewed spec as a pull request, quick checks run in about 1.5 minutes, and a person reads it against the spec and merges it; if a check fails, the change is fixed and pushed again. Operations: the full test run of about 1,030 checks runs on main and every night, results are published to a dashboard and test reports, and when releasing, a release gate deploys only on GO.</desc>`);
  out.push(`<defs>${['muted', 'bad', 'blue'].map((c) => `<marker id="a-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${t[c]}"/></marker>`).join('')}</defs>`);
  out.push(`<rect width="${W}" height="${H}" rx="16" fill="${t.page}"/>`);
  out.push(`<g font-family="${FONT}">`);

  for (const [name, note, from, to] of PHASES) {
    const x = cardX(from) - 6, w = cardX(to) + CARD_W + 6 - x;
    out.push(`<rect x="${x}" y="10" width="${w}" height="${Y0 + CARD_H - 4}" rx="14" fill="${t.band}"/>`);
    out.push(`<text x="${x + 14}" y="36" font-size="13" font-weight="800" letter-spacing="1.3" fill="${t.blue}">${esc(name.toUpperCase())}</text>`);
    out.push(`<text x="${x + 14}" y="58" font-size="${fit(note, 14.5, w - 28).toFixed(1)}" fill="${t.muted}">${esc(note)}</text>`);
  }

  STEPS.forEach(([title, lines, chip], i) => {
    const x = cardX(i), y = Y0;
    out.push(`<rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="12" fill="${t.surface}" stroke="${t.ring}"/>`);
    out.push(`<circle cx="${x + 26}" cy="${y + 27}" r="13" fill="${t.blue}"/>`);
    out.push(`<text x="${x + 26}" y="${y + 32}" text-anchor="middle" font-size="14" font-weight="700" fill="#ffffff">${i + 1}</text>`);
    out.push(`<text x="${x + 14}" y="${y + 68}" font-size="${fit(title, 17, CARD_W - 24).toFixed(1)}" font-weight="700" fill="${t.text}">${esc(title)}</text>`);
    lines.forEach((l, k) => out.push(`<text x="${x + 14}" y="${y + 92 + k * 19}" font-size="${fit(l, 14.5, CARD_W - 24).toFixed(1)}" fill="${t.secondary}">${esc(l)}</text>`));
    const chipW = Math.min(chip.length * 7.6 + 20, CARD_W - 26);
    out.push(`<rect x="${x + 14}" y="${y + 124}" width="${chipW}" height="23" rx="11.5" fill="${t.track}"/>`);
    out.push(`<text x="${x + 14 + chipW / 2}" y="${y + 140}" text-anchor="middle" font-size="13" font-weight="700" fill="${t.trackText}">${esc(chip)}</text>`);
    if (i < n - 1) {
      const ax = x + CARD_W + 2, ay = y + CARD_H / 2;
      out.push(`<line x1="${ax}" y1="${ay}" x2="${ax + GAP - 4}" y2="${ay}" stroke="${t.muted}" stroke-width="2" marker-end="url(#a-muted)"/>`);
    }
  });

  // Failure loop: quick checks back to the step that wrote the code.
  const x2 = cardX(LOOP[0]) + CARD_W / 2, x1 = cardX(LOOP[1]) + CARD_W / 2;
  out.push(`<path d="M${x2},${by} V${loopY - 12} Q${x2},${loopY} ${x2 - 12},${loopY} H${x1 + 12} Q${x1},${loopY} ${x1},${loopY - 12} V${by + 6}" fill="none" stroke="${t.bad}" stroke-width="2.5" stroke-dasharray="7 5" marker-end="url(#a-bad)"/>`);
  out.push(`<text x="${(x1 + x2) / 2}" y="${loopY + 24}" text-anchor="middle" font-size="15" font-weight="700" fill="${t.bad}">Something failed: fix it and push again</text>`);

  // Release gate below the full test run.
  const gx = cardX(GATE), gw = CARD_W * 2 + GAP, fx = cardX(GATE) + CARD_W / 2;
  out.push(`<line x1="${fx}" y1="${by}" x2="${fx}" y2="${gy - 4}" stroke="${t.blue}" stroke-width="2.5" stroke-dasharray="7 5" marker-end="url(#a-blue)"/>`);
  out.push(`<text x="${fx + 12}" y="${by + 34}" font-size="14" fill="${t.muted}">when releasing</text>`);
  out.push(`<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="12" fill="${t.surface}" stroke="${t.ring}"/>`);
  out.push(`<rect x="${gx}" y="${gy + 9}" width="4" height="${gh - 18}" rx="2" fill="${t.blue}"/>`);
  out.push(`<text x="${gx + 18}" y="${gy + 26}" font-size="17" font-weight="700" fill="${t.text}">Release gate</text>`);
  out.push(`<text x="${gx + 18}" y="${gy + 49}" font-size="14.5" fill="${t.secondary}">Reads the results; deploys only on</text>`);
  const goX = gx + 258;
  out.push(`<rect x="${goX}" y="${gy + 34}" width="40" height="21" rx="10.5" fill="${t.good}"/><text x="${goX + 20}" y="${gy + 49}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#ffffff">GO</text>`);
  out.push(`</g></svg>`);
  return out.join('\n');
}

const dir = process.argv[2];
for (const [name, t] of Object.entries(THEMES)) fs.writeFileSync(`${dir}/workflow-${name}.svg`, svg(t));
console.log('written');
