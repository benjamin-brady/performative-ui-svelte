<script lang="ts">
	import type { Snippet } from 'svelte';
	import CodeBlock from './CodeBlock.svelte';

	let {
		title,
		code,
		stretch = false,
		inverted = false,
		children
	}: {
		title?: string;
		code: string;
		/** Skip the dotted-grid demo background (full-bleed demos). */
		stretch?: boolean;
		/** Use the lighter background panel. */
		inverted?: boolean;
		children: Snippet;
	} = $props();

	/**
	 * Intercept clicks on placeholder anchors (href="#") inside demos so they
	 * don't navigate. Real links fall through unchanged.
	 */
	function swallowPlaceholderAnchorClicks(e: MouseEvent) {
		const anchor = (e.target as HTMLElement).closest('a');
		if (!anchor) return;
		const href = anchor.getAttribute('href');
		if (href === '#' || href === '' || href === null) {
			e.preventDefault();
		}
	}
</script>

<div class="example">
	{#if title}<div class="example__title">{title}</div>{/if}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		class={['example__demo', stretch && 'example__demo--stretch', inverted && 'example__demo--inverted']
			.filter(Boolean)
			.join(' ')}
		onclick={swallowPlaceholderAnchorClicks}
	>
		{@render children()}
	</div>
	<CodeBlock {code} />
</div>
