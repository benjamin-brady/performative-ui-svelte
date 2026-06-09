<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { UseCounterOptions } from '$lib/hooks/useCounter.svelte';

	export interface StatCounterProps extends HTMLAttributes<HTMLSpanElement>, UseCounterOptions {
		/** Format the displayed number. Default: locale-string with commas. */
		format?: (value: number) => string;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { useCounter } from '$lib/hooks/useCounter.svelte';

	let {
		target,
		durationMs,
		from,
		ease,
		format = (n: number) => n.toLocaleString(),
		class: className,
		...rest
	}: StatCounterProps = $props();

	// svelte-ignore state_referenced_locally
	const counter = useCounter({ target, durationMs, from, ease });
</script>

<span data-slot="stat-counter" class={cn('font-sans text-[length:inherit] font-extrabold leading-none tracking-[-0.04em] [font-variant-numeric:tabular-nums]', className)} {...rest}>{format(counter.value)}</span>
