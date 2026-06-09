<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { UseTokenStreamOptions } from '$lib/hooks/useTokenStream.svelte';

	export interface TokenStreamProps extends HTMLAttributes<HTMLSpanElement>, UseTokenStreamOptions {
		/** Hide the trailing blinking caret. */
		hideCaret?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { useTokenStream } from '$lib/hooks/useTokenStream.svelte';

	let {
		text,
		speedMs,
		tokenize,
		loop,
		loopDelayMs,
		onComplete,
		hideCaret,
		class: className,
		...rest
	}: TokenStreamProps = $props();

	// svelte-ignore state_referenced_locally
	const stream = useTokenStream({ text, speedMs, tokenize, loop, loopDelayMs, onComplete });
</script>

<span class={cn(className)} {...rest}>
	{stream.output}
	{#if !hideCaret && stream.isStreaming}<span class="pui-bubble__stream-caret"></span>{/if}
</span>
