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
	data-slot="chat-bubble"
	class={cn(
		'max-w-[88%] rounded-[18px] px-[18px] py-3.5 font-sans text-[15px] leading-[1.55] text-pui-fg',
		role === 'user'
			? 'ml-auto rounded-br bg-[var(--pui-bubble-user-fill)] border border-pui-border-bright'
			: 'mr-auto rounded-bl border border-[oklch(0.541_0.251_293/0.35)] bg-[var(--pui-glass-deep)] shadow-[0_0_32px_oklch(0.541_0.251_293/0.18)]',
		className
	)}
	{...rest}
>
	{#if role === 'ai' && (agent || thinking !== false || icon !== false)}
		<div data-slot="chat-bubble-meta" class="mb-2 inline-flex items-center gap-2 font-mono text-xs text-pui-fg-mute">
			{#if icon !== false}{#if icon}{@render icon()}{:else}<Sparkle />{/if}{/if}
			{#if typeof agent === 'string'}<span>{agent}</span>{:else if agent}<span>{@render agent()}</span>{/if}
			{#if thinking !== false}
				<span data-slot="chat-bubble-thinking" class="inline-flex items-center gap-1.5 rounded-full border border-pui-border-bright px-2 py-0.5 text-[11px]">
					<span class="inline-block size-2 animate-[pui-spin_0.9s_linear_infinite] rounded-full border-[1.2px] border-white/20 border-t-pui-grad-mid"></span>
					<span>{#if typeof thinking === 'string'}{thinking}{:else if thinking}{@render thinking()}{:else}thinking…{/if}</span>
				</span>
			{/if}
		</div>
	{/if}
	<div data-slot="chat-bubble-stream" class="whitespace-pre-wrap text-[15px] leading-[1.6]">{@render children?.()}</div>
</div>
