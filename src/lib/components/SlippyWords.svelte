<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type SlippyNode = string | Snippet;

	/** A single badge. A bare string is shorthand for `{ label }`. */
	export type SlippyWord =
		| string
		| { label: SlippyNode; key?: string; gradient?: boolean };

	export interface SlippyWordsProps extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Rows of badges. Each row slides horizontally as the component
		 * scrolls through the viewport; consecutive rows travel in opposite
		 * directions. Provide more badges than fit so the sliding never
		 * exposes an empty edge.
		 */
		rows: SlippyWord[][];
		/** Max horizontal travel, in px, from one viewport edge to the other. */
		intensity?: number;
		/** Direction the first row drifts as you scroll down. Rows alternate. */
		startDirection?: 'left' | 'right';
		/** Gap between badges in px. */
		gap?: number;
		/** Apply an edge-fade mask so badges dissolve at the sides. */
		fade?: boolean;
		/** Render every badge with the mandatory gradient fill. */
		gradient?: boolean;
		/** Disable the scroll coupling (also forced under prefers-reduced-motion). */
		static?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		rows,
		intensity = 240,
		startDirection = 'left',
		gap = 12,
		fade = true,
		gradient = false,
		static: isStatic,
		class: className,
		style,
		...rest
	}: SlippyWordsProps = $props();

	let host = $state<HTMLDivElement | null>(null);

	let mergedStyle = $derived(`${style ? style + ';' : ''}--pui-slip-gap:${gap}px`);
	let firstDir = $derived(startDirection === 'left' ? -1 : 1);

	function normalize(word: SlippyWord) {
		return typeof word === 'string' ? { label: word as SlippyNode } : word;
	}

	function wordKey(word: SlippyWord, ri: number, wi: number) {
		return (typeof word === 'object' && word.key) || `${ri}-${wi}`;
	}

	$effect(() => {
		if (!host || isStatic) return;
		const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const el = host;
		let raf = 0;
		const update = () => {
			raf = 0;
			const rect = el.getBoundingClientRect();
			const vh = window.innerHeight || document.documentElement.clientHeight;
			// 0 when the strip's top hits the bottom of the viewport,
			// 1 when its bottom passes the top. Centered to [-0.5, 0.5].
			const p = (vh - rect.top) / (vh + rect.height);
			const offset = (Math.min(1, Math.max(0, p)) - 0.5) * intensity;
			el.style.setProperty('--pui-slip', `${offset}px`);
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<div
	bind:this={host}
	data-slot="slippy-words"
	class={cn(
		'relative flex flex-col overflow-hidden gap-[var(--pui-slip-gap,12px)]',
		fade &&
			'[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]',
		className
	)}
	style={mergedStyle}
	aria-label="Featured terms"
	{...rest}
>
	{#each rows as row, ri (ri)}
		<div
			data-slot="slippy-words-row"
			class="flex flex-nowrap items-center justify-center gap-[var(--pui-slip-gap,12px)] mx-auto w-max min-w-full will-change-transform [transform:translate3d(calc(var(--pui-slip,0px)*var(--pui-slip-dir,1)),0,0)] motion-reduce:transform-none motion-reduce:flex-wrap"
			style="--pui-slip-dir:{ri % 2 === 0 ? firstDir : -firstDir}"
		>
			{#each row as word, wi (wordKey(word, ri, wi))}
				{@const w = normalize(word)}
				<span
					data-slot="slippy-words-word"
					class={cn(
						'inline-flex items-center whitespace-nowrap px-[18px] py-2 rounded-full border border-pui-border-bright bg-[var(--pui-glass-soft)] font-sans text-[17px] font-semibold tracking-[-0.01em] text-pui-fg-dim',
						(gradient || (typeof word === 'object' && word.gradient)) &&
							'border-transparent text-white bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))]'
					)}
				>
					{#if typeof w.label === 'string'}{w.label}{:else}{@render w.label()}{/if}
				</span>
			{/each}
		</div>
	{/each}
</div>
