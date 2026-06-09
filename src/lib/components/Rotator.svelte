<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { UseTypewriterOptions } from '$lib/hooks/useTypewriter.svelte';

	export interface RotatorProps
		extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'>,
			UseTypewriterOptions {
		/** Hide the blinking cursor. */
		hideCursor?: boolean;
		/**
		 * Cursor character. If omitted, renders a CSS-drawn block that aligns to
		 * the text baseline (terminal-style). Pass a string to use a custom glyph.
		 */
		cursor?: string;
		/** Custom renderer for the in-progress word. */
		renderWord?: Snippet<[string, number]>;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { useTypewriter } from '$lib/hooks/useTypewriter.svelte';

	let {
		words,
		typeMs,
		deleteMs,
		holdMs,
		loop,
		onWordReached,
		hideCursor = false,
		cursor,
		renderWord,
		class: className,
		...rest
	}: RotatorProps = $props();

	// svelte-ignore state_referenced_locally
	const tw = useTypewriter({ words, typeMs, deleteMs, holdMs, loop, onWordReached });
</script>

<span class={cn('pui-rotator', className)} {...rest}>
	{#if renderWord}{@render renderWord(tw.word, tw.index)}{:else}{tw.word}{/if}
	{#if !hideCursor}
		<span
			aria-hidden="true"
			class={cn(
				'pui-rotator__cursor',
				cursor === undefined && 'pui-rotator__cursor--block',
				'pui-rotator__cursor--blink'
			)}
		>{cursor}</span>
	{/if}
</span>
