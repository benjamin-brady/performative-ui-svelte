<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type CommunityBadgeNode = string | Snippet;

	export interface CommunityBadgeProps extends Omit<HTMLAnchorAttributes, 'title'> {
		/** Icon src (svg). Apply your own filter if needed. */
		icon?: string;
		/** Render any node in place of <img>. */
		iconNode?: Snippet;
		title: CommunityBadgeNode;
		subtitle: CommunityBadgeNode;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { icon, iconNode, title, subtitle, class: className, ...rest }: CommunityBadgeProps = $props();
</script>

<a class={cn('pui-community', className)} {...rest}>
	{#if iconNode}
		{@render iconNode()}
	{:else if icon}
		<img class="pui-community__icon" src={icon} alt="" />
	{/if}
	<div>
		<div class="pui-community__top">
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</div>
		<div class="pui-community__bottom">
			{#if typeof subtitle === 'string'}{subtitle}{:else}{@render subtitle()}{/if}
		</div>
	</div>
</a>
