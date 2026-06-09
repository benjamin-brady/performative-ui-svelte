<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type IdeTokenClass = 'key' | 'str' | 'num' | 'com' | 'fn' | '';
	export interface IdeToken {
		/** Raw source text including whitespace. */
		c: string;
		/** Token class for syntax color. Empty string for plain. */
		cls?: IdeTokenClass;
	}

	export { default as MockIDEChrome } from './MockIDEChrome.svelte';
	export { default as MockIDEBody } from './MockIDEBody.svelte';

	export interface MockIDEProps extends HTMLAttributes<HTMLDivElement> {
		/** Filename shown in the tab. */
		filename?: string;
		/** Tokens to type out (in order). If omitted, renders an empty body. */
		tokens?: IdeToken[];
		/** Loop after finishing. */
		loop?: boolean;
		/** ms range per character. */
		charMs?: [number, number];
		/** Label for the "AI is writing…" pill. Pass false to hide. */
		thinkingLabel?: string | Snippet | false;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import MockIDEBody from './MockIDEBody.svelte';
	import MockIDEChrome from './MockIDEChrome.svelte';

	let {
		filename,
		tokens,
		loop = true,
		charMs = [14, 42],
		thinkingLabel = 'AI is writing…',
		class: className,
		children,
		...rest
	}: MockIDEProps = $props();
</script>

<div data-slot="mock-ide" data-theme="dark" class={cn('overflow-hidden rounded-[var(--pui-radius)] border border-pui-border-bright bg-[#0a0a10] font-mono shadow-[0_30px_80px_oklch(0_0_0/0.55),0_0_60px_oklch(0.541_0.251_293/0.18)]', className)} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		<MockIDEChrome {filename} thinking={thinkingLabel} />
		<MockIDEBody tokens={tokens ?? []} {loop} {charMs} />
	{/if}
</div>
