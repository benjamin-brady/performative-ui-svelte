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

<div class={cn('pui-logo-row', className)} {...rest}>
	{#if heading}
		<p class="pui-logo-row__heading">
			{#if typeof heading === 'string'}{heading}{:else}{@render heading()}{/if}
		</p>
	{/if}
	<div class="pui-logo-row__items">
		{#each logos as item, i (itemKey(item, i))}
			{#if item.kind === 'img'}
				<img src={item.src} alt={item.alt ?? ''} />
			{:else}
				<span class="pui-logo-row__text">
					{#if typeof item.node === 'string'}{item.node}{:else}{@render item.node()}{/if}
				</span>
			{/if}
		{/each}
	</div>
</div>
