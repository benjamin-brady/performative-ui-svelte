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
	data-slot="logo-marquee"
	class={cn(
		'relative overflow-hidden',
		fade && '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
		className
	)}
	style={mergedStyle}
	aria-label="Trusted by"
	{...rest}
>
	<div data-slot="logo-marquee-track" class={cn('flex w-max items-center animate-[pui-marquee_var(--pui-marquee-speed,40s)_linear_infinite]', pauseOnHover && 'hover:[animation-play-state:paused]')}>
		{#each logos as item, i (itemKey(item, i))}
			<span data-slot="logo-marquee-item" class="mr-[var(--pui-marquee-gap,56px)] inline-flex items-center [&_img]:h-7 [&_img]:w-auto [&_img]:opacity-70 [&_img]:transition-[opacity,filter] [&_img]:duration-200 [&_img]:ease-pui [&_img]:[filter:var(--pui-logo-filter)] hover:[&_img]:opacity-100 hover:[&_img]:[filter:var(--pui-logo-filter-hover)]">
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
			<span data-slot="logo-marquee-item" aria-hidden="true" class="mr-[var(--pui-marquee-gap,56px)] inline-flex items-center [&_img]:h-7 [&_img]:w-auto [&_img]:opacity-70 [&_img]:transition-[opacity,filter] [&_img]:duration-200 [&_img]:ease-pui [&_img]:[filter:var(--pui-logo-filter)] hover:[&_img]:opacity-100 hover:[&_img]:[filter:var(--pui-logo-filter-hover)]">
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
