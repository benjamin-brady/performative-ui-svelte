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
	data-slot="glass-card"
	class={cn(
		'relative transform-gpu overflow-hidden rounded-[var(--pui-radius-xl)] border border-[var(--pui-overlay-strong)] bg-[linear-gradient(180deg,var(--pui-overlay),transparent)] px-[26px] pb-6 pt-7 font-sans backdrop-blur-xl transition-[transform,border-color] duration-200 ease-pui before:absolute before:inset-[-1px] before:-z-10 before:rounded-[inherit] before:bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-0.5 hover:border-white/15',
		breathing && 'animate-[pui-breathe_6s_ease-in-out_infinite]',
		glowOnHover && 'hover:before:opacity-35 hover:before:blur-[14px]',
		className
	)}
	{...rest}
>
	{@render children?.()}
</article>
