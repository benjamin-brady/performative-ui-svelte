<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type LogoRowNode = string | Snippet;

	export type LogoRowItem =
		| { kind: 'img'; src: string; alt?: string }
		| { kind: 'node'; node: LogoRowNode; key?: string };

	export interface LogoRowProps extends HTMLAttributes<HTMLDivElement> {
		/** Header copy ("Backed by", "From alumni of", "As seen in"). */
		heading?: LogoRowNode;
		logos: LogoRowItem[];
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { heading, logos, class: className, ...rest }: LogoRowProps = $props();

	function itemKey(item: LogoRowItem, index: number) {
		return item.kind === 'img' ? index : (item.key ?? index);
	}
</script>

<div data-slot="logo-row" class={cn('text-center font-sans', className)} {...rest}>
	{#if heading}
		<p data-slot="logo-row-heading" class="mb-[18px] text-[11px] uppercase tracking-[0.18em] text-pui-fg-mute">
			{#if typeof heading === 'string'}{heading}{:else}{@render heading()}{/if}
		</p>
	{/if}
	<div data-slot="logo-row-items" class="inline-flex flex-wrap items-center justify-center gap-7 opacity-75 [&_img]:h-6 [&_img]:w-auto [&_img]:opacity-75 [&_img]:[filter:var(--pui-logo-filter)]">
		{#each logos as item, i (itemKey(item, i))}
			{#if item.kind === 'img'}
				<img src={item.src} alt={item.alt ?? ''} />
			{:else}
				<span data-slot="logo-row-text" class="whitespace-nowrap text-base font-bold tracking-[0.04em] text-[var(--pui-logo-text-strong)]">
					{#if typeof item.node === 'string'}{item.node}{:else}{@render item.node()}{/if}
				</span>
			{/if}
		{/each}
	</div>
</div>
