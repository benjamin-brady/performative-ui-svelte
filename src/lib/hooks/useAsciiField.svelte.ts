export interface UseAsciiFieldOptions {
/** Grid width in cells. Default: auto-computed from container width. */
cols?: number;
/** Grid height in cells. Default: auto-computed from container height. */
rows?: number;
/** Font size in px for rendered characters. Default 11. */
fontSize?: number;
/** Font family override (must be monospace). */
fontFamily?: string;
/** Characters from sparsest to densest. */
charRamp?: string;

/* ----- Color ----- */
/** Paint with the default aurora palette. */
colorful?: boolean;
/** Custom palette (overrides `colorful`). */
palette?: string[];
/** Base alpha (0–1). Drop low (≈ 0.18) to use as a background. */
baseOpacity?: number;

/* ----- Cursor ----- */
/** Enable cursor reactivity (ripple + spotlight). */
reactive?: boolean;
/** Cursor ripple amplitude. */
rippleStrength?: number;
/** Cursor ripple falloff radius (cells). */
rippleRadius?: number;
/** Alpha used at the cursor center; falls off radially to baseOpacity. */
spotlightOpacity?: number;
/** Cursor spotlight radius (cells). */
spotlightRadius?: number;

/** ms throttle between frames. Default 50. */
frameMs?: number;
}

interface RefObject<T> {
readonly current: T;
}

const DEFAULT_RAMP =
" .`'\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const DEFAULT_PALETTE = ['#a78bfa', '#ec4899', '#67e8f9', '#fbbf24'];

/**
 * Drives a `<canvas>` (sized to its `host` parent) with a procedural
 * ASCII field. Supports per-cell color (aurora palette) and per-cell
 * opacity (cursor spotlight). Auto-resizes on container change.
 */
export function useAsciiField(
canvasRef: RefObject<HTMLCanvasElement | null>,
hostRef: RefObject<HTMLElement | null>,
options: UseAsciiFieldOptions = {}
): void {
$effect(() => {
const canvas = canvasRef.current;
const host = hostRef.current;
const {
cols: colsOpt,
rows: rowsOpt,
fontSize = 11,
fontFamily = 'JetBrains Mono, ui-monospace, monospace',
charRamp = DEFAULT_RAMP,
colorful = false,
palette: paletteOpt,
baseOpacity = 1,
reactive = true,
rippleStrength = 1.4,
rippleRadius = 6,
spotlightOpacity,
spotlightRadius = 8,
frameMs = 50
} = options;
const palette = paletteOpt ?? (colorful ? DEFAULT_PALETTE : null);

if (!canvas || !host) return;
const ctx = canvas.getContext('2d');
if (!ctx) return;

let raf = 0;
let lastFrame = 0;
let cols = 0;
let rows = 0;
let cellW = 0;
let cellH = 0;
let baseField = new Float32Array(0);
let dpr = 1;
// Canvas-relative mouse position — computed in onMove, not per-frame.
const mouse = { x: -9999, y: -9999 };

const seed = () => {
baseField = new Float32Array(cols * rows);
for (let y = 0; y < rows; y++) {
for (let x = 0; x < cols; x++) {
const nx = (x / cols) * 2 - 1;
const ny = (y / rows) * 2 - 1;
const r = Math.sqrt(nx * nx + ny * ny);
const stripes = 0.5 + 0.5 * Math.sin(nx * 6 + ny * 2);
const radial = 1 - Math.min(1, r * 1.2);
baseField[y * cols + x] = 0.25 * stripes + 0.55 * radial;
}
}
};

const resize = () => {
const rect = host.getBoundingClientRect();
if (rect.width === 0 || rect.height === 0) return;
dpr = Math.min(window.devicePixelRatio || 1, 2);

canvas.width = Math.max(1, Math.floor(rect.width * dpr));
canvas.height = Math.max(1, Math.floor(rect.height * dpr));

ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
ctx.font = `${fontSize}px ${fontFamily}`;
ctx.textBaseline = 'top';

const m = ctx.measureText('M');
const measured = m.width || fontSize * 0.6;
cellW = measured;
cellH = fontSize * 1.15;

cols = colsOpt ?? Math.max(1, Math.floor(rect.width / cellW));
rows = rowsOpt ?? Math.max(1, Math.floor(rect.height / cellH));

if (colsOpt !== undefined) cellW = rect.width / cols;
if (rowsOpt !== undefined) cellH = rect.height / rows;

seed();
};

const render = (t: number) => {
if (t - lastFrame < frameMs) {
raf = requestAnimationFrame(render);
return;
}
lastFrame = t;
if (cols === 0 || rows === 0) {
resize();
raf = requestAnimationFrame(render);
return;
}

const time = t * 0.001;
// mouse is already canvas-relative (set by onMove); use sentinel to detect outside.
const cx = mouse.x / cellW;
const cy = mouse.y / cellH;
const margin = 24;
const mouseInside = mouse.x > -9000;
const withinCanvas =
mouse.x >= -margin &&
mouse.x <= cols * cellW + margin &&
mouse.y >= -margin &&
mouse.y <= rows * cellH + margin;

ctx.clearRect(0, 0, cols * cellW, rows * cellH);

const rampMax = charRamp.length - 1;
const useSpotlight = typeof spotlightOpacity === 'number' && spotlightOpacity !== baseOpacity;
const spotR2 = spotlightRadius * spotlightRadius * 2;

for (let y = 0; y < rows; y++) {
for (let x = 0; x < cols; x++) {
const base = baseField[y * cols + x];
const wave = 0.15 * Math.sin(x * 0.18 + time * 1.4) * Math.cos(y * 0.22 - time * 1.1);

const dx = x - cx;
const dy = (y - cy) * 1.8;
const d2 = dx * dx + dy * dy;
const d = Math.sqrt(d2);

const ripple =
reactive && mouseInside && withinCanvas
? rippleStrength * Math.exp(-d2 / 80) -
0.6 * Math.exp(-((d - rippleRadius) * (d - rippleRadius)) / 30)
: 0;

const v = Math.max(0, Math.min(1, base + wave + ripple));
const ch = charRamp[Math.floor(v * rampMax)];
if (ch === ' ') continue;

let alpha = baseOpacity;
if (useSpotlight && mouseInside && withinCanvas) {
const spot = Math.exp(-d2 / spotR2);
alpha = baseOpacity + (spotlightOpacity! - baseOpacity) * spot;
if (alpha < 0) alpha = 0;
if (alpha > 1) alpha = 1;
}
if (alpha <= 0.01) continue;

let color = '#c8c8d4';
if (palette && palette.length) {
const huePos = (x * 0.1 + y * 0.07 + time * 0.12) % palette.length;
const idx = Math.floor(Math.abs(huePos));
color = palette[idx % palette.length];
}

ctx.globalAlpha = alpha;
ctx.fillStyle = color;
ctx.fillText(ch, x * cellW, y * cellH);
}
}
ctx.globalAlpha = 1;
raf = requestAnimationFrame(render);
};

const onMove = (e: MouseEvent) => {
// Store canvas-relative coords so render() avoids getBoundingClientRect per frame.
const rect = canvas.getBoundingClientRect();
mouse.x = e.clientX - rect.left;
mouse.y = e.clientY - rect.top;
};

const ro = new ResizeObserver(resize);
ro.observe(host);
resize();

if (reactive) {
window.addEventListener('mousemove', onMove, { passive: true });
}
raf = requestAnimationFrame(render);

return () => {
cancelAnimationFrame(raf);
ro.disconnect();
if (reactive) {
window.removeEventListener('mousemove', onMove);
}
};
});
}
