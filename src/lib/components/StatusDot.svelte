<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
		/** CSS color for the dot. Defaults to var(--pui-success). */
		color?: string;
		/** Disable the pulse animation. */
		static?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		color,
		static: isStatic = false,
		class: className,
		style,
		...rest
	}: StatusDotProps = $props();

	let mergedStyle = $derived(color ? `${style ? `${style};` : ''}background:${color};color:${color}` : style);
</script>

<span
	aria-hidden="true"
	data-slot="status-dot"
	class={cn(
		'inline-block size-1.5 rounded-full bg-[var(--pui-dot-color,var(--pui-success))] text-[var(--pui-dot-color,var(--pui-success))] shadow-[0_0_10px_currentColor]',
		!isStatic && 'animate-[pui-pulse-dot_1.6s_ease-in-out_infinite]',
		className
	)}
	style={mergedStyle}
	{...rest}
></span>
