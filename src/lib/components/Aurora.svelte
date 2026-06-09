<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export interface AuroraBlob {
		color: string;
		x: number;
		y: number;
		size?: number;
	}

	export interface AuroraProps extends HTMLAttributes<HTMLDivElement> {
		/** Color blobs. Each {color, x, y, size} renders one radial gradient. */
		blobs?: AuroraBlob[];
		/** Blur amount in px. */
		blur?: number;
		/** Disable the slow drift animation. */
		static?: boolean;
		/** Lava-lamp mode: blobs drift, repel each other, spring home. */
		animated?: boolean;
		/** When `animated`, how aggressively blobs push apart. 0 disables. */
		repulsion?: number;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	const DEFAULT_BLOBS: AuroraBlob[] = [
		{ color: 'rgba(124,58,237,0.45)', x: 20, y: 30, size: 60 },
		{ color: 'rgba(236,72,153,0.35)', x: 80, y: 25, size: 50 },
		{ color: 'rgba(6,182,212,0.30)', x: 50, y: 80, size: 50 }
	];

	let {
		blobs = DEFAULT_BLOBS,
		blur = 50,
		static: isStatic = false,
		animated = false,
		repulsion = 0.18,
		class: className,
		style,
		...rest
	}: AuroraProps = $props();

	let blobEls: Array<HTMLDivElement | null> = $state([]);

	let mergedStyle = $derived(`${style ? style + ';' : ''}filter:blur(${blur}px) saturate(140%)`);

	$effect(() => {
		if (!animated) return;
		const state = blobs.map((b) => ({
			x: b.x,
			y: b.y,
			homeX: b.x,
			homeY: b.y,
			size: b.size ?? 50,
			vx: (Math.random() - 0.5) * 0.06,
			vy: (Math.random() - 0.5) * 0.06
		}));

		let raf = 0;
		const tick = () => {
			for (let i = 0; i < state.length; i++) {
				const b = state[i];
				b.vx *= 0.965;
				b.vy *= 0.965;
				b.vx += (b.homeX - b.x) * 0.0009;
				b.vy += (b.homeY - b.y) * 0.0009;

				for (let j = 0; j < state.length; j++) {
					if (i === j) continue;
					const o = state[j];
					const dx = b.x - o.x;
					const dy = b.y - o.y;
					const d = Math.hypot(dx, dy);
					const minDist = (b.size + o.size) * 0.4;
					if (d < minDist && d > 0.001) {
						const force = ((minDist - d) / minDist) * repulsion;
						b.vx += (dx / d) * force;
						b.vy += (dy / d) * force;
					}
				}

				b.vx += (Math.random() - 0.5) * 0.012;
				b.vy += (Math.random() - 0.5) * 0.012;
				b.x += b.vx;
				b.y += b.vy;

				const min = -10;
				const max = 110;
				if (b.x < min) {
					b.x = min;
					b.vx = Math.abs(b.vx) * 0.6;
				}
				if (b.x > max) {
					b.x = max;
					b.vx = -Math.abs(b.vx) * 0.6;
				}
				if (b.y < min) {
					b.y = min;
					b.vy = Math.abs(b.vy) * 0.6;
				}
				if (b.y > max) {
					b.y = max;
					b.vy = -Math.abs(b.vy) * 0.6;
				}

				const el = blobEls[i];
				if (el) {
					el.style.transform = `translate(${(b.x / b.size - 0.5) * 100}%, ${(b.y / b.size - 0.5) * 100}%)`;
				}
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div
	aria-hidden="true"
	class={cn('pui-aurora', !isStatic && !animated && 'pui-aurora--drift', className)}
	style={mergedStyle}
	{...rest}
>
	{#each blobs as b, i (i)}
		{@const size = b.size ?? 50}
		<div
			bind:this={blobEls[i]}
			class="pui-aurora__blob"
			style="position:absolute;left:0;top:0;width:{size}%;height:{size}%;will-change:transform;background:radial-gradient(circle at center, {b.color} 0%, transparent 70%);transform:translate({(b.x / size - 0.5) * 100}%, {(b.y / size - 0.5) * 100}%);pointer-events:none;border-radius:50%"
		></div>
	{/each}
</div>
