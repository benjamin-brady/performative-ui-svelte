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

<span data-slot="rotator" class={cn('inline-block text-left', className)} {...rest}>
	{#if renderWord}{@render renderWord(tw.word, tw.index)}{:else}{tw.word}{/if}
	{#if !hideCursor}
		<span
			aria-hidden="true"
			class={cn(
				'ml-0.5 inline-block animate-[pui-caret_1.05s_steps(2,start)_infinite] bg-none text-pui-fg [-webkit-text-fill-color:currentColor]',
				cursor === undefined && 'h-[1.05em] w-[0.55em] rounded-px bg-current align-[-0.18em]'
			)}
		>{cursor}</span>
	{/if}
</span>
