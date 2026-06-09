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
	data-slot="gradient-text"
	class={cn(
		'inline-block bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] bg-[length:200%_200%] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]',
		!isStatic && 'animate-[pui-grad-shift_8s_ease_infinite]',
		className
	)}
	{...rest}
>{@render children?.()}</svelte:element>
