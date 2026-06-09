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

<div class={cn('pui-sticky-banner', className)} {...rest}>
	{#if !hideSparkle}<Sparkle />{/if}
	<span>{@render children?.()}</span>
	{@render trailing?.()}
</div>
