<script lang="ts" module>
import type { Snippet } from 'svelte';

type Content = string | Snippet;

export interface PopoverProps {
/** Controlled open state. */
open?: boolean;
/** Uncontrolled initial open state. */
defaultOpen?: boolean;
/** Open-state callback. */
onOpenChange?: (open: boolean) => void;
/** ms to wait before auto-opening the popover. 0 disables auto-open. */
timer?: number;
/** Title shown at the top. */
title?: Content;
/** Body content (typically a form). */
children?: Snippet;
/** Small dismissal link rendered under the body. Pass false to hide. */
closeLabel?: Content | false;
/** Allow the Escape key to close. Default false. */
closeOnEscape?: boolean;
/** Allow clicks on the backdrop to close. Default false. */
closeOnBackdrop?: boolean;
/** Render target for the portal. Defaults to document.body. */
container?: HTMLElement | null;
class?: string;
}
</script>

<script lang="ts">
import { BROWSER as browser } from 'esm-env';
import { cn } from '$lib/utils/cn';
import { untrack } from 'svelte';
import { Portal } from 'bits-ui';

let {
open: controlledOpen = undefined,
defaultOpen = false,
onOpenChange,
timer = 0,
title,
children,
closeLabel = 'Maybe later',
closeOnEscape = false,
closeOnBackdrop = false,
container,
class: className
}: PopoverProps = $props();

// svelte-ignore state_referenced_locally
let internalOpen = $state(defaultOpen);
let isControlled = $derived(controlledOpen !== undefined);
let isOpen = $derived(isControlled ? controlledOpen : internalOpen);
let portalTarget = $derived(container ?? undefined);
const titleId = `pui-popover-title-${Math.random().toString(36).slice(2)}`;
let dialogRef: HTMLDivElement | undefined = $state();

function setOpen(next: boolean) {
if (!isControlled) internalOpen = next;
onOpenChange?.(next);
}

$effect(() => {
const snapshotTimer = untrack(() => timer);
const snapshotOpen = untrack(() => isOpen);
if (!browser || snapshotTimer <= 0 || snapshotOpen) return;
const id = window.setTimeout(() => setOpen(true), snapshotTimer);
return () => window.clearTimeout(id);
});

$effect(() => {
if (!browser || !isOpen || !closeOnEscape) return;
const onKey = (e: KeyboardEvent) => {
if (e.key === 'Escape') {
e.preventDefault();
setOpen(false);
}
};
document.addEventListener('keydown', onKey);
return () => document.removeEventListener('keydown', onKey);
});

$effect(() => {
if (!browser || !isOpen) return;
const onKey = (e: KeyboardEvent) => {
if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
const blocked = ['[', ']', 'j', 'k', 'ArrowLeft', 'ArrowRight'];
if (blocked.includes(e.key)) e.stopPropagation();
};
document.addEventListener('keydown', onKey, { capture: true });
return () => document.removeEventListener('keydown', onKey, true);
});

$effect(() => {
if (!browser || !isOpen) return;
const prev = document.body.style.overflow;
document.body.style.overflow = 'hidden';
return () => {
document.body.style.overflow = prev;
};
});

$effect(() => {
if (!browser || !isOpen || !dialogRef) return;
const prevFocus = document.activeElement as HTMLElement | null;
const SELECTOR =
'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
const getFocusable = () =>
Array.from(dialogRef!.querySelectorAll<HTMLElement>(SELECTOR));
(getFocusable()[0] ?? dialogRef)?.focus();
const trap = (e: KeyboardEvent) => {
if (e.key !== 'Tab') return;
const els = getFocusable();
if (!els.length) {
	e.preventDefault();
	dialogRef?.focus();
	return;
}
if (!dialogRef?.contains(document.activeElement)) {
	e.preventDefault();
	(e.shiftKey ? els[els.length - 1] : els[0]).focus();
	return;
}
const first = els[0];
const last = els[els.length - 1];
if (e.shiftKey && document.activeElement === first) {
	e.preventDefault();
	last.focus();
} else if (!e.shiftKey && document.activeElement === last) {
	e.preventDefault();
	first.focus();
}
};
document.addEventListener('keydown', trap);
return () => {
document.removeEventListener('keydown', trap);
prevFocus?.focus();
};
});
</script>

{#if isOpen && browser}
<Portal to={portalTarget}>
<div class="pui-popover-overlay">
	<div
		class="pui-popover-backdrop"
		aria-hidden="true"
		onclick={closeOnBackdrop ? () => setOpen(false) : undefined}
	></div>
	<div
		class={cn('pui-popover', className)}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? titleId : undefined}
		aria-label={!title ? 'Dialog' : undefined}
		tabindex="-1"
		bind:this={dialogRef}
	>
		{#if title}
		<div class="pui-popover__title" id={titleId}>
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</div>
		{/if}
		<div class="pui-popover__body">{@render children?.()}</div>
		{#if closeLabel !== false}
		<button type="button" class="pui-popover__dismiss" onclick={() => setOpen(false)}>
			{#if typeof closeLabel === 'string'}{closeLabel}{:else if closeLabel}{@render closeLabel()}{/if}
		</button>
		{/if}
	</div>
</div>
</Portal>
{/if}
