<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';

export interface WavesProps extends HTMLAttributes<HTMLDivElement> {
	/** Number of flowing waveform lines. Default 6. */
	lines?: number;
	/** Stroke colors, distributed across the lines. */
	colors?: string[];
	/** Peak vertical travel (px) of the swell at full envelope. Default 46. */
	amplitude?: number;
	/** Animation rate. Higher flows faster. Default 1. */
	speed?: number;
	/** Stroke width in px. Default 1.5. */
	lineWidth?: number;
	/** Resting stroke opacity (0–1). Default 0.55. */
	baseOpacity?: number;
	/**
	 * Number of harmonics summed per line. More = choppier, more ocean-like.
	 * Default 4. Frequencies are incommensurate so the curve never looks
	 * like a clean sine.
	 */
	complexity?: number;
	/** How far (0–1 of height) the lines fan out from the vertical centre. Default 0.22. */
	spread?: number;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let {
	lines = 6,
	colors = ['#fde047', '#facc15', '#eab308', '#fef08a', '#ca8a04'],
	amplitude = 46,
	speed = 1,
	lineWidth = 1.5,
	baseOpacity = 0.55,
	complexity = 4,
	spread = 0.22,
	class: className,
	...rest
}: WavesProps = $props();

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
	let raf = 0;
	let start = performance.now();

	type Harmonic = { freq: number; amp: number; phase: number; drift: number };
	type Line = {
		color: string;
		offset: number;
		harmonics: Harmonic[];
		envFreq: number;
		envPhase: number;
		envDrift: number;
		flow: number;
	};

	let waves: Line[] = [];

	const seed = () => {
		const harmonicCount = Math.max(1, Math.round(complexity));
		waves = Array.from({ length: Math.max(1, Math.round(lines)) }, (_, i) => {
			const t = lines > 1 ? i / (lines - 1) : 0.5;
			// Each line sums several sines whose frequencies are deliberately
			// non-integer multiples — the result reads as an organic swell
			// rather than a repeating waveform.
			let weight = 0;
			const harmonics: Harmonic[] = Array.from({ length: harmonicCount }, (_, k) => {
				const amp = 1 / (k + 1.35);
				weight += amp;
				return {
					freq: 0.6 + k * 0.85 + Math.random() * 0.5,
					amp,
					phase: Math.random() * Math.PI * 2,
					drift: (0.12 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1)
				};
			});
			// Normalise so the summed amplitude stays ~1 regardless of complexity.
			for (const h of harmonics) h.amp /= weight;
			return {
				color: colors.length ? colors[i % colors.length] : '#facc15',
				offset: (t - 0.5) * 2 * spread,
				harmonics,
				envFreq: 0.5 + Math.random() * 0.7,
				envPhase: Math.random() * Math.PI * 2,
				envDrift: 0.1 + Math.random() * 0.18,
				flow: 0.18 + Math.random() * 0.14
			};
		});
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
	};

	const sample = (line: Line, nx: number, time: number): number => {
		let y = 0;
		for (const h of line.harmonics) {
			y += h.amp * Math.sin(nx * h.freq * Math.PI * 2 + h.phase + time * h.drift);
		}
		// A slow envelope that wanders along x so the swell bunches and flattens
		// in places, the way real water does.
		const env =
			0.45 + 0.55 * (0.5 + 0.5 * Math.sin(nx * line.envFreq * Math.PI * 2 + line.envPhase + time * line.envDrift));
		return y * env;
	};

	const tick = (now: number) => {
		ctx.clearRect(0, 0, width, height);
		const time = ((now - start) / 1000) * speed;
		const centreY = height / 2;
		const step = 6;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		for (const line of waves) {
			const baseY = centreY + line.offset * height * 0.5;
			ctx.beginPath();
			let first = true;
			for (let x = -step; x <= width + step; x += step) {
				// Scroll the waveform horizontally by shifting the sample point.
				const nx = x / width + time * line.flow;
				const y = baseY + sample(line, nx, time) * amplitude;
				if (first) {
					ctx.moveTo(x, y);
					first = false;
				} else {
					ctx.lineTo(x, y);
				}
			}
			ctx.strokeStyle = withAlpha(line.color, baseOpacity);
			ctx.stroke();
		}
		raf = requestAnimationFrame(tick);
	};

	const ro = new ResizeObserver(resize);
	ro.observe(host);
	resize();
	seed();
	start = performance.now();
	raf = requestAnimationFrame(tick);

	return () => {
		cancelAnimationFrame(raf);
		ro.disconnect();
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

<div
	bind:this={hostEl}
	data-slot="waves"
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 z-[1]', className)}
	{...rest}
>
	<canvas bind:this={canvasEl}></canvas>
</div>
