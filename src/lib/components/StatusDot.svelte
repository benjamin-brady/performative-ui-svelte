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

	let mergedStyle = $derived(color ? `${style ? style + ';' : ''}background:${color};color:${color}` : style);
</script>

<span
	aria-hidden="true"
	class={cn('pui-dot', !isStatic && 'pui-dot--pulse', className)}
	style={mergedStyle}
	{...rest}
></span>
