<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type MarqueeNode = string | Snippet;

	export type MarqueeItem =
		| { kind: 'img'; src: string; alt?: string }
		| { kind: 'node'; node: MarqueeNode; key?: string };

	export interface LogoMarqueeProps extends HTMLAttributes<HTMLDivElement> {
		logos: MarqueeItem[];
		/** Seconds for one full loop. */
		speed?: number;
		/** Gap between logos in px. */
		gap?: number;
		/** Apply edge-fade mask. */
		fade?: boolean;
		/** Pause animation on hover. */
		pauseOnHover?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		logos,
		speed = 40,
		gap = 56,
		fade = true,
		pauseOnHover,
		class: className,
		style,
		...rest
	}: LogoMarqueeProps = $props();

	let mergedStyle = $derived(
		`${style ? style + ';' : ''}--pui-marquee-speed:${speed}s;--pui-marquee-gap:${gap}px`
	);

	function itemKey(item: MarqueeItem, index: number) {
		return item.kind === 'img' ? `a${index}` : (item.key ?? `b${index}`);
	}
</script>

<div
	class={cn(
		'pui-marquee',
		fade && 'pui-marquee--fade',
		pauseOnHover && 'pui-marquee--paused-on-hover',
		className
	)}
	style={mergedStyle}
	aria-label="Trusted by"
	{...rest}
>
	<div class="pui-marquee__track">
		{#each logos as item, i (itemKey(item, i))}
			<span class="pui-marquee__item">
				{#if item.kind === 'img'}
					<img src={item.src} alt={item.alt ?? ''} />
				{:else if typeof item.node === 'string'}
					{item.node}
				{:else}
					{@render item.node()}
				{/if}
			</span>
		{/each}
		{#each logos as item, i (itemKey(item, i + logos.length))}
			<span class="pui-marquee__item">
				{#if item.kind === 'img'}
					<img src={item.src} alt={item.alt ?? ''} />
				{:else if typeof item.node === 'string'}
					{item.node}
				{:else}
					{@render item.node()}
				{/if}
			</span>
		{/each}
	</div>
</div>
