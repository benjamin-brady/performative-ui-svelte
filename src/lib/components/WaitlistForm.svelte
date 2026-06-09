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

<div class={cn('pui-waitlist-wrap', className)}>
<form class="pui-waitlist" onsubmit={submit} {...rest}>
{#if leading === false}
<!-- hidden -->
{:else}
<span class="pui-waitlist__icon" aria-hidden="true">
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
<input class="pui-waitlist__input" type="email" {placeholder} bind:value />
<Button type="submit" variant="solid">
{#if typeof ctaLabel === 'string'}{ctaLabel}{:else if ctaLabel}{@render ctaLabel()}{/if}
</Button>
</form>
{#if footnote}
<div class="pui-waitlist__footnote">
{#if typeof footnote === 'string'}{footnote}{:else}{@render footnote()}{/if}
</div>
{/if}
</div>
