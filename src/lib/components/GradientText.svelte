<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface GradientTextProps extends HTMLAttributes<HTMLElement> {
		/** Disable the slow gradient shift (still gradient-colored, just static). */
		static?: boolean;
		/** Render as a different tag (e.g. h1, em). */
		as?: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		as = 'span',
		static: isStatic = false,
		class: className,
		children,
		...rest
	}: GradientTextProps = $props();
</script>

<svelte:element
	this={as}
	class={cn('pui-gradient-text', !isStatic && 'pui-gradient-text--animate', className)}
	{...rest}
>{@render children?.()}</svelte:element>
