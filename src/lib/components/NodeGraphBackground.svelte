<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';

export interface NodeGraphBackgroundProps extends HTMLAttributes<HTMLDivElement> {
/** Number of nodes. Default 70. */
density?: number;
/** Pixel speed per frame. Default 0.4. */
speed?: number;
/** Distance under which two nodes are linked. Default 140. */
linkDistance?: number;
/** Node colors (one is picked per node). */
colors?: string[];
/** Link color. */
linkColor?: string;
/** Radius (px) within which the cursor affects nodes/edges. */
hoverDistance?: number;
/** Strength (0–1) of the cursor's pull on nearby nodes. */
hoverGravity?: number;
/** Strength (0–1) of the opacity boost on nodes/edges near the cursor. */
hoverBrighten?: number;
/** Resting opacity (0–1) for nodes and link strokes. Default 0.45. */
baseOpacity?: number;
/** px the simulation world extends past the visible viewport. */
overscan?: number;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let {
density = 70,
speed = 0.4,
linkDistance = 140,
colors = ['#a78bfa', '#f0abfc', '#67e8f9'],
linkColor = '#7c3aed',
hoverDistance = 200,
hoverGravity = 0.005,
hoverBrighten = 0.8,
baseOpacity = 0.45,
overscan = 80,
class: className,
...rest
}: NodeGraphBackgroundProps = $props();

let hostEl: HTMLDivElement | null = $state(null);
let canvasEl: HTMLCanvasElement | null = $state(null);

$effect(() => {
const host = hostEl;
const canvas = canvasEl;
if (!host || !canvas) return;
const ctx = canvas.getContext('2d');
if (!ctx) return;

let width = 0;
let height = 0;
let dpr = 1;
const mouse = { x: -9999, y: -9999 };
let raf = 0;
type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };
let nodes: Node[] = [];

const seed = () => {
const wMin = -overscan;
const wMax = width + overscan;
const hMin = -overscan;
const hMax = height + overscan;
nodes = Array.from({ length: density }, () => ({
x: wMin + Math.random() * (wMax - wMin),
y: hMin + Math.random() * (hMax - hMin),
vx: (Math.random() - 0.5) * speed * 2,
vy: (Math.random() - 0.5) * speed * 2,
r: 1 + Math.random() * 1.6,
color: colors.length ? colors[Math.floor(Math.random() * colors.length)] : '#a78bfa'
}));
};

const resize = () => {
const rect = host.getBoundingClientRect();
dpr = Math.min(window.devicePixelRatio || 1, 2);
width = rect.width;
height = rect.height;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
seed();
};

const tick = () => {
ctx.clearRect(0, 0, width, height);
const worldLeft = -overscan;
const worldRight = width + overscan;
const worldTop = -overscan;
const worldBottom = height + overscan;
const mouseInside = mouse.x > -9000;

for (const n of nodes) {
n.x += n.vx;
n.y += n.vy;
if (n.x < worldLeft || n.x > worldRight) n.vx *= -1;
if (n.y < worldTop || n.y > worldBottom) n.vy *= -1;
if (hoverDistance > 0 && hoverGravity > 0 && mouseInside) {
const dx = mouse.x - n.x;
const dy = mouse.y - n.y;
const d = Math.hypot(dx, dy);
if (d < hoverDistance) {
const pull = (1 - d / hoverDistance) * hoverGravity;
n.x += dx * pull;
n.y += dy * pull;
}
}
}

const brighten = (px: number, py: number) => {
if (!mouseInside || hoverDistance <= 0 || hoverBrighten <= 0) return 0;
const d = Math.hypot(mouse.x - px, mouse.y - py);
if (d >= hoverDistance) return 0;
return (1 - d / hoverDistance) * hoverBrighten;
};

ctx.lineWidth = 1;
for (let i = 0; i < nodes.length; i++) {
for (let j = i + 1; j < nodes.length; j++) {
const a = nodes[i];
const b = nodes[j];
const dlink = Math.hypot(a.x - b.x, a.y - b.y);
if (dlink < linkDistance) {
const lengthAlpha = 1 - dlink / linkDistance;
const midBoost = brighten((a.x + b.x) / 2, (a.y + b.y) / 2);
const alpha = Math.min(1, lengthAlpha * baseOpacity + midBoost * lengthAlpha);
ctx.strokeStyle = withAlpha(linkColor, alpha);
ctx.beginPath();
ctx.moveTo(a.x, a.y);
ctx.lineTo(b.x, b.y);
ctx.stroke();
}
}
}

for (const n of nodes) {
const boost = brighten(n.x, n.y);
const alpha = Math.min(1, baseOpacity + boost);
ctx.fillStyle = withAlpha(n.color, alpha);
ctx.beginPath();
ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
ctx.fill();
}
raf = requestAnimationFrame(tick);
};

const onMove = (e: MouseEvent) => {
mouse.x = e.offsetX;
mouse.y = e.offsetY;
};
const onLeave = () => {
mouse.x = -9999;
mouse.y = -9999;
};
const ro = new ResizeObserver(resize);
ro.observe(host);
resize();
host.addEventListener('mousemove', onMove);
host.addEventListener('mouseleave', onLeave);
raf = requestAnimationFrame(tick);

return () => {
cancelAnimationFrame(raf);
ro.disconnect();
host.removeEventListener('mousemove', onMove);
host.removeEventListener('mouseleave', onLeave);
};
});

function withAlpha(color: string, a: number): string {
if (color.startsWith('#')) {
let r: number, g: number, b: number;
if (color.length === 4) {
r = parseInt(color[1] + color[1], 16);
g = parseInt(color[2] + color[2], 16);
b = parseInt(color[3] + color[3], 16);
} else {
r = parseInt(color.slice(1, 3), 16);
g = parseInt(color.slice(3, 5), 16);
b = parseInt(color.slice(5, 7), 16);
}
return `rgba(${r},${g},${b},${a})`;
}
return color;
}
</script>

<div bind:this={hostEl} aria-hidden="true" class={cn('pui-node-graph', className)} {...rest}>
<canvas bind:this={canvasEl}></canvas>
</div>
