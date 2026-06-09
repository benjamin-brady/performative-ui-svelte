<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface StickyBannerProps extends HTMLAttributes<HTMLDivElement> {
		/** Hide the leading sparkle. */
		hideSparkle?: boolean;
		/** Optional trailing accessory (e.g. an arrow). */
		trailing?: Snippet;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import Sparkle from './Sparkle.svelte';

	let { hideSparkle = false, trailing, class: className, children, ...rest }: StickyBannerProps = $props();
</script>

<div
	data-slot="sticky-banner"
	class={cn(
		'flex items-center justify-center gap-2 border-b border-pui-border bg-[linear-gradient(90deg,oklch(0.56_0.24_302/0.10),oklch(0.66_0.24_354/0.10),oklch(0.75_0.15_232/0.10))] px-4 py-2 font-sans text-[13px] text-pui-fg-dim',
		className
	)}
	{...rest}
>
	{#if !hideSparkle}<Sparkle />{/if}
	<span>{@render children?.()}</span>
	{@render trailing?.()}
</div>
