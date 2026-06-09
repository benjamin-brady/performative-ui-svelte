<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ChatFABHeaderProps extends HTMLAttributes<HTMLDivElement> {
		onClose?: () => void;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils/cn';
	import Sparkle from './Sparkle.svelte';
	import { CHAT_FAB_CLOSE } from './ChatFAB.svelte';

	let { onClose, class: className, children, ...rest }: ChatFABHeaderProps = $props();
	const ctxClose = getContext<() => void>(CHAT_FAB_CLOSE) ?? (() => {});
</script>

<div data-slot="chat-fab-header" class={cn('flex items-center gap-2 border-b border-pui-border px-4 py-3.5 text-sm font-semibold', className)} {...rest}>
	<Sparkle />
	<span>{@render children?.()}</span>
	<button type="button" aria-label="Close" class="ml-auto cursor-pointer border-0 bg-transparent px-1 py-0 text-[22px] leading-none text-pui-fg-mute" onclick={onClose ?? ctxClose}>
		×
	</button>
</div>
