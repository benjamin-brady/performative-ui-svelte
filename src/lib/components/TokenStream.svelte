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

<span data-slot="token-stream" class={cn(className)} {...rest}>
	{stream.output}
	{#if !hideCaret && stream.isStreaming}<span data-slot="token-stream-caret" class="ml-px inline-block h-3.5 w-2 animate-[pui-caret_1s_steps(2,start)_infinite] bg-pui-fg align-[-2px]"></span>{/if}
</span>
