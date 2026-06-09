<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface MockIDEChromeProps extends HTMLAttributes<HTMLDivElement> {
		filename?: string;
		thinking?: string | Snippet | false;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { filename, thinking, class: className, children, ...rest }: MockIDEChromeProps = $props();
</script>

<div data-slot="mock-ide-chrome" class={cn('flex items-center gap-2 border-b border-pui-border bg-[#11111a] px-3.5 py-2.5 text-xs text-pui-fg-mute', className)} {...rest}>
	<span data-slot="mock-ide-dot" class="inline-block size-[11px] rounded-full bg-[#ff5f56]"></span>
	<span data-slot="mock-ide-dot" class="inline-block size-[11px] rounded-full bg-[#ffbd2e]"></span>
	<span data-slot="mock-ide-dot" class="inline-block size-[11px] rounded-full bg-[#27c93f]"></span>
	{#if filename}<span data-slot="mock-ide-tab" class="ml-2 rounded-md bg-[#1a1a26] px-2.5 py-[3px] text-pui-fg-dim">{filename}</span>{/if}
	{@render children?.()}
	{#if thinking !== false}
		<span data-slot="mock-ide-thinking" class="ml-auto inline-flex items-center gap-1.5 text-[11px] text-pui-fg-dim">
			<span class="inline-block size-2.5 animate-[pui-spin_0.9s_linear_infinite] rounded-full border-[1.5px] border-white/20 border-t-pui-grad-mid"></span>
			<span>{#if typeof thinking === 'string'}{thinking}{:else}{@render thinking?.()}{/if}</span>
		</span>
	{/if}
</div>
