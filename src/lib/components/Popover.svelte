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
import { Dialog } from 'bits-ui';

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
let isOpen = $derived(isControlled ? controlledOpen === true : internalOpen);
let portalTarget = $derived(container ?? undefined);
// svelte-ignore state_referenced_locally
let dialogOpen = $state(controlledOpen ?? defaultOpen);
const containedShortcutKeys = new Set(['[', ']', 'j', 'k', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

function setOpen(next: boolean) {
if (!isControlled) internalOpen = next;
dialogOpen = isControlled ? (controlledOpen ?? next) : next;
onOpenChange?.(next);
}

function containShortcutKeys(event: KeyboardEvent) {
if (containedShortcutKeys.has(event.key)) event.stopPropagation();
}

$effect(() => {
dialogOpen = isOpen;
});

$effect(() => {
const snapshotTimer = untrack(() => timer);
const snapshotOpen = untrack(() => isOpen);
if (!browser || snapshotTimer <= 0 || snapshotOpen) return;
const id = window.setTimeout(() => setOpen(true), snapshotTimer);
return () => window.clearTimeout(id);
});
</script>

{#if browser}
<Dialog.Root bind:open={dialogOpen} onOpenChange={setOpen}>
<Dialog.Portal to={portalTarget}>
<Dialog.Overlay
data-slot="popover-overlay"
class="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm"
/>
<Dialog.Content
data-slot="popover-content"
escapeKeydownBehavior={closeOnEscape ? 'close' : 'ignore'}
interactOutsideBehavior={closeOnBackdrop ? 'close' : 'ignore'}
class={cn(
'fixed left-1/2 top-1/2 z-50 w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/70 bg-white/95 p-6 text-slate-950 shadow-2xl shadow-slate-950/20 outline-none backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50',
className
)}
onkeydowncapture={containShortcutKeys}
>
{#if title}
<Dialog.Title
data-slot="popover-title"
class="text-balance text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50"
>
{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
</Dialog.Title>
{/if}
<div data-slot="popover-body" class={cn('mt-4', !title && 'mt-0')}>{@render children?.()}</div>
{#if closeLabel !== false}
<Dialog.Close
data-slot="popover-dismiss"
class="mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-50 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950"
>
{#if typeof closeLabel === 'string'}{closeLabel}{:else if closeLabel}{@render closeLabel()}{/if}
</Dialog.Close>
{/if}
</Dialog.Content>
</Dialog.Portal>
</Dialog.Root>
{/if}
