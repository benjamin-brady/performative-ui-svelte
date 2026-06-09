<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export const CHAT_FAB_CLOSE = Symbol('pui-chat-fab-close');

	export { default as ChatFABHeader } from './ChatFABHeader.svelte';
	export { default as ChatFABBody } from './ChatFABBody.svelte';

	export interface ChatFABProps extends Omit<HTMLButtonAttributes, 'popover'> {
		/** Button label. */
		label?: string | Snippet;
		/** Controlled open state. */
		open?: boolean;
		/** Default open state for uncontrolled mode. */
		defaultOpen?: boolean;
		onOpenChange?: (open: boolean) => void;
		/** Popover contents. Compose ChatFABHeader / ChatFABBody inside. */
		popover?: Snippet;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils/cn';
	import Sparkle from './Sparkle.svelte';

	let {
		label = 'Ask AI',
		open,
		defaultOpen,
		onOpenChange,
		popover,
		class: className,
		onclick,
		...rest
	}: ChatFABProps = $props();

	// svelte-ignore state_referenced_locally
	let internal = $state(defaultOpen ?? false);
	let controlled = $derived(open !== undefined);
	let isOpen = $derived(controlled ? !!open : internal);

	const setOpen = (next: boolean) => {
		if (!controlled) internal = next;
		onOpenChange?.(next);
	};
	const toggle = () => setOpen(!isOpen);
	const close = () => setOpen(false);

	setContext(CHAT_FAB_CLOSE, close);

	function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		onclick?.(e);
		toggle();
	}
</script>

<button data-slot="chat-fab" class={cn('fixed bottom-6 right-6 z-30 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--pui-button-dark-border)] bg-[var(--pui-button-dark-fill)] px-[18px] py-3 font-sans text-sm font-semibold text-pui-fg shadow-[var(--pui-shadow-fab),0_0_0_1px_oklch(0.541_0.251_293/0.25),0_0_32px_oklch(0.541_0.251_293/0.35)]', className)} onclick={handleClick} aria-expanded={isOpen} {...rest}>
	<Sparkle />
	<span>{#if typeof label === 'string'}{label}{:else}{@render label()}{/if}</span>
</button>
{#if isOpen}
	<div data-slot="chat-fab-popover" role="dialog" class="fixed bottom-[76px] right-6 z-30 w-[340px] overflow-hidden rounded-[18px] border border-pui-border-bright bg-[var(--pui-button-dark-popover-fill)] font-sans text-pui-fg shadow-[var(--pui-shadow-deep),0_0_60px_oklch(0.541_0.251_293/0.22)]">
		{@render popover?.()}
	</div>
{/if}
