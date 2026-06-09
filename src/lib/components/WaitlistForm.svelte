<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export interface WaitlistFormProps extends HTMLAttributes<HTMLFormElement> {
placeholder?: string;
defaultValue?: string;
ctaLabel?: Content;
/** Leading icon. Pass false to remove. Default: envelope. */
leading?: Snippet | false;
/** Tiny line of text rendered below the form (e.g. "We email weekly."). */
footnote?: Content;
/** Fires with the email value on submit. */
onSubmit?: (email: string) => void;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';
import Button from './Button.svelte';

let {
placeholder = 'you@startup.ai',
defaultValue = '',
ctaLabel = 'Notify me',
leading,
footnote,
onSubmit,
class: className,
...rest
}: WaitlistFormProps = $props();

// svelte-ignore state_referenced_locally
let value = $state(defaultValue);

function submit(e: SubmitEvent) {
e.preventDefault();
onSubmit?.(value);
}
</script>

<div class={cn('w-full max-w-md', className)}>
<form
data-slot="waitlist-form"
class="relative flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-lg shadow-slate-950/5 backdrop-blur sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-950/80"
onsubmit={submit}
{...rest}
>
{#if leading === false}
<!-- hidden -->
{:else}
<span
data-slot="waitlist-icon"
class="pointer-events-none absolute ml-4 mt-4 hidden text-slate-400 sm:mt-0 sm:flex dark:text-slate-500"
aria-hidden="true"
>
{#if leading}
{@render leading()}
{:else}
<svg
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="1.6"
stroke-linecap="round"
stroke-linejoin="round"
width="18"
height="18"
>
<rect x="3" y="5" width="18" height="14" rx="2" />
<path d="M3 7l9 6 9-6" />
</svg>
{/if}
</span>
{/if}
<input
data-slot="waitlist-input"
class={cn(
'min-h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:border-transparent sm:bg-transparent sm:pl-10 sm:focus:border-transparent sm:focus:ring-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-slate-700 dark:focus:ring-slate-800 dark:sm:border-transparent dark:sm:bg-transparent'
)}
type="email"
{placeholder}
bind:value
/>
<Button type="submit" variant="solid">
{#if typeof ctaLabel === 'string'}{ctaLabel}{:else if ctaLabel}{@render ctaLabel()}{/if}
</Button>
</form>
{#if footnote}
<div data-slot="waitlist-footnote" class="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
{#if typeof footnote === 'string'}{footnote}{:else}{@render footnote()}{/if}
</div>
{/if}
</div>
