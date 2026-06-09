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

<a data-slot="community-badge" class={cn('inline-flex items-center gap-3.5 rounded-[14px] border border-pui-border-bright bg-pui-bg-elev px-5 py-4 font-sans text-pui-fg no-underline transition-[transform,border-color] duration-200 ease-pui hover:-translate-y-0.5 hover:border-[oklch(0.541_0.251_293/0.4)]', className)} {...rest}>
	{#if iconNode}
		{@render iconNode()}
	{:else if icon}
		<img data-slot="community-badge-icon" class="size-7 opacity-85 [filter:var(--pui-logo-filter)]" src={icon} alt="" />
	{/if}
	<div>
		<div data-slot="community-badge-top" class="text-sm font-semibold">
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</div>
		<div data-slot="community-badge-bottom" class="mt-0.5 font-mono text-xs text-pui-fg-mute">
			{#if typeof subtitle === 'string'}{subtitle}{:else}{@render subtitle()}{/if}
		</div>
	</div>
</a>
