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

<div class={cn('pui-fab-popover__header', className)} {...rest}>
	<Sparkle />
	<span>{@render children?.()}</span>
	<button type="button" aria-label="Close" class="pui-fab-popover__close" onclick={onClose ?? ctxClose}>
		×
	</button>
</div>
