<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface EyebrowPillProps extends HTMLAttributes<HTMLSpanElement> {
		/** Provide a custom icon snippet, or pass false to hide the dot entirely. */
		icon?: Snippet | false;
		/** Status dot color (when using the default dot icon). */
		statusColor?: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import StatusDot from './StatusDot.svelte';

	let { icon, statusColor, class: className, children, ...rest }: EyebrowPillProps = $props();
</script>

<span
	data-slot="eyebrow-pill"
	class={cn(
		'inline-flex items-center gap-2 rounded-full border border-pui-border-bright bg-pui-glass-soft px-3.5 py-1.5 font-sans text-[13px] text-pui-fg-dim backdrop-blur-md transition-colors hover:border-pui-fg-mute hover:text-pui-fg',
		className
	)}
	{...rest}
>
	{#if icon === false}
		<!-- hidden -->
	{:else if icon}
		{@render icon()}
	{:else}
		<StatusDot color={statusColor} />
	{/if}
	<span>{@render children?.()}</span>
</span>
