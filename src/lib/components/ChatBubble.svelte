<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type ChatRole = 'user' | 'ai';

	export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
		role: ChatRole;
		/** AI-only: the agent name shown in the meta row. */
		agent?: string | Snippet;
		/** AI-only: text in the thinking pill (e.g. "reasoning…"). False to hide. */
		thinking?: string | Snippet | false;
		/** AI-only: replace the leading sparkle. */
		icon?: Snippet | false;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import Sparkle from './Sparkle.svelte';

	let { role, agent, thinking, icon, class: className, children, ...rest }: ChatBubbleProps = $props();
</script>

<div
	class={cn('pui-bubble', role === 'user' ? 'pui-bubble--user' : 'pui-bubble--ai', className)}
	{...rest}
>
	{#if role === 'ai' && (agent || thinking !== false || icon !== false)}
		<div class="pui-bubble__meta">
			{#if icon !== false}{#if icon}{@render icon()}{:else}<Sparkle />{/if}{/if}
			{#if typeof agent === 'string'}<span>{agent}</span>{:else if agent}<span>{@render agent()}</span>{/if}
			{#if thinking !== false}
				<span class="pui-bubble__thinking-pill">
					<span class="pui-spinner pui-spinner--sm"></span>
					<span>{#if typeof thinking === 'string'}{thinking}{:else if thinking}{@render thinking()}{:else}thinking…{/if}</span>
				</span>
			{/if}
		</div>
	{/if}
	<div class="pui-bubble__stream">{@render children?.()}</div>
</div>
