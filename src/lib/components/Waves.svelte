<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';

export interface WavesProps extends HTMLAttributes<HTMLDivElement> {
	/** Number of flowing waveform lines. Default 6. */
	lines?: number;
	/**
	 * Stroke colors, distributed across the lines. Any CSS color, including
	 * `var(--…)` custom properties — resolved against the host element at
	 * runtime. Defaults to the theme gradient tokens.
	 */
	colors?: string[];
	/** Peak vertical travel (px) of a bulge at full envelope. Default 96. */
	amplitude?: number;
	/** Animation rate. Higher moves the bulges faster. Default 0.16. */
	speed?: number;
	/** Stroke width in px. Default 1.5. */
	lineWidth?: number;
	/** Resting stroke opacity (0–1). Default 0.55. */
	baseOpacity?: number;
	/**
	 * Number of harmonics summed per line. Each travels at its own speed and
	 * slowly waxes/wanes, so crests form and dissolve rather than sliding as
	 * one rigid shape. Fewer = longer, calmer swell; more = busier. Default 4.
	 */
	complexity?: number;
	/** How far (0–1 of height) the lines fan out from the vertical centre. Default 0.22. */
	spread?: number;
	/**
	 * Fraction (0–0.5) of the width over which each line fades to transparent
	 * at the left and right ends. 0 disables the fade. Default 0.18.
	 */
	edgeFade?: number;
	/**
	 * How strongly the swell concentrates toward the horizontal centre (0–1).
	 * 0 = uniform across the width; 1 = lines are flat at the ends and only
	 * swell in the middle. Default 0.55.
	 */
	centerBias?: number;
	/**
	 * Forward lean of each crest, like an ocean wave about to break (0–1).
	 * 0 = upright; higher shears each crest toward the travel direction so the
	 * leading face steepens. Default 0.55.
	 */
	skew?: number;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let {
	lines = 6,
	colors = ['var(--pui-grad-from)', 'var(--pui-grad-mid)', 'var(--pui-grad-to)'],
	amplitude = 72,
	speed = 0.16,
	lineWidth = 1.5,
	baseOpacity = 0.55,
	complexity = 4,
	spread = 0.22,
	edgeFade = 0.18,
	centerBias = 0.55,
	skew = 0.55,
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

	// Resolve CSS custom properties (e.g. 'var(--pui-grad-from)') against the
	// host so the canvas gets a concrete color it can paint.
	const cssStyle = getComputedStyle(host);
	const resolveColor = (c: string): string => {
		const m = c.match(/var\(\s*(--[\w-]+)\s*\)/);
		if (m) {
			const v = cssStyle.getPropertyValue(m[1]).trim();
			if (v) return v;
		}
		return c;
	};

	type Harmonic = {
		freq: number;
		amp: number;
		phase: number;
		w: number;
		modFreq: number;
		modPhase: number;
		modDepth: number;
	};
	type Line = {
		color: string;
		offset: number;
		harmonics: Harmonic[];
		envFreq: number;
		envPhase: number;
		envDrift: number;
	};

	let waves: Line[] = [];

	const seed = () => {
		const harmonicCount = Math.max(1, Math.round(complexity));
		waves = Array.from({ length: Math.max(1, Math.round(lines)) }, (_, i) => {
			const t = lines > 1 ? i / (lines - 1) : 0.5;
			// Sum of sines where each component has its OWN phase velocity (w)
			// and a slow amplitude modulation. Because the components travel at
			// different speeds, crests continuously build and dissolve — a real
			// swell, not a rigid shape sliding sideways.
			let weight = 0;
			const harmonics: Harmonic[] = Array.from({ length: harmonicCount }, (_, k) => {
				const freq = 0.45 + k * 0.55 + Math.random() * 0.35;
				const amp = 1 / (k + 1.3);
				weight += amp;
				return {
					freq,
					amp,
					phase: Math.random() * Math.PI * 2,
					// Deep-water-ish dispersion: longer waves move faster. Negative
					// so crests travel left → right. Jittered per component.
					w: -(0.6 + Math.sqrt(freq) * 0.9) * (0.85 + Math.random() * 0.5),
					modFreq: 0.15 + Math.random() * 0.35,
					modPhase: Math.random() * Math.PI * 2,
					modDepth: 0.35 + Math.random() * 0.3
				};
			});
			for (const h of harmonics) h.amp /= weight;
			return {
				color: colors.length ? resolveColor(colors[i % colors.length]) : resolveColor('var(--pui-grad-from)'),
				offset: (t - 0.5) * 2 * spread,
				harmonics,
				envFreq: 0.4 + Math.random() * 0.5,
				envPhase: Math.random() * Math.PI * 2,
				envDrift: 0.1 + Math.random() * 0.18
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

	// Signed displacement (~-1..1) for a line at normalized x `nx` (0..1).
	const sample = (line: Line, nx: number, time: number): number => {
		let y = 0;
		for (const h of line.harmonics) {
			// Each component drifts at its own phase velocity; its amplitude
			// slowly breathes so the swell waxes and wanes over time.
			const mod = 1 - h.modDepth + h.modDepth * (0.5 + 0.5 * Math.sin(time * h.modFreq + h.modPhase));
			y += h.amp * mod * Math.sin(nx * h.freq * Math.PI * 2 + h.phase + time * h.w);
		}
		// A slow envelope that itself drifts, so calm and rough patches move
		// along the line instead of sitting still.
		const env =
			0.45 + 0.55 * (0.5 + 0.5 * Math.sin(nx * line.envFreq * Math.PI * 2 + line.envPhase + time * line.envDrift));
		return y * env;
	};

	const tick = (now: number) => {
		ctx.clearRect(0, 0, width, height);
		const time = ((now - start) / 1000) * speed;
		const centreY = height / 2;
		const step = 5;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		for (const line of waves) {
			const baseY = centreY + line.offset * height * 0.5;
			ctx.beginPath();
			let first = true;
			for (let x = -step; x <= width + step; x += step) {
				const disp = sample(line, x / width, time) * amplitude * centreEnv(x);
				// Shear the crest toward the travel direction (left → right) so it
				// leans like an ocean wave about to break.
				const xDraw = x + skew * disp;
				const yDraw = baseY - disp;
				if (first) {
					ctx.moveTo(xDraw, yDraw);
					first = false;
				} else {
					ctx.lineTo(xDraw, yDraw);
				}
			}
			ctx.globalAlpha = Math.max(0, Math.min(1, baseOpacity));
			ctx.strokeStyle = strokeFor(line.color);
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
		raf = requestAnimationFrame(tick);
	};

	// Bell-shaped horizontal envelope: tallest swell mid-background, tapering
	// toward the ends by `centerBias`.
	const centreEnv = (x: number): number => {
		const bias = Math.max(0, Math.min(1, centerBias));
		if (bias <= 0 || width <= 0) return 1;
		const tx = Math.max(0, Math.min(1, x / width));
		const bell = Math.sin(Math.PI * tx);
		return 1 - bias + bias * bell;
	};

	// Opacity comes from ctx.globalAlpha; the gradient only handles the
	// horizontal fade so any CSS color (incl. oklch) works on canvas.
	const strokeFor = (color: string): string | CanvasGradient => {
		const fade = Math.max(0, Math.min(0.5, edgeFade));
		if (fade <= 0 || width <= 0) return color;
		const grad = ctx.createLinearGradient(0, 0, width, 0);
		grad.addColorStop(0, 'transparent');
		grad.addColorStop(fade, color);
		grad.addColorStop(1 - fade, color);
		grad.addColorStop(1, 'transparent');
		return grad;
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
