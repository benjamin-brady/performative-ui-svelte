<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export { default as GlassCardIcon } from './GlassCardIcon.svelte';
	export { default as GlassCardTitle } from './GlassCardTitle.svelte';
	export { default as GlassCardBody } from './GlassCardBody.svelte';
	export { default as GlassCardLink } from './GlassCardLink.svelte';

	export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
		/** Apply the slow breathing glow animation. */
		breathing?: boolean;
		/** Show the gradient halo on hover. */
		glowOnHover?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		breathing,
		glowOnHover = true,
		class: className,
		children,
		...rest
	}: GlassCardProps = $props();
</script>

<article
	class={cn(
		'pui-glass-card',
		breathing && 'pui-glass-card--breathing',
		glowOnHover && 'pui-glass-card--glow-hover',
		className
	)}
	{...rest}
>
	{@render children?.()}
</article>
