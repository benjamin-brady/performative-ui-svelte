<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export interface BeforeAfterArrowProps extends HTMLAttributes<HTMLDivElement> {
brand?: Content;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';
import Sparkle from './Sparkle.svelte';

let { brand, class: className, ...rest }: BeforeAfterArrowProps = $props();
</script>

<div data-slot="before-after-arrow" class={cn('self-center inline-flex flex-col items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-pui-fg-dim [&>:first-child]:text-2xl [&>:last-child]:text-[22px]', className)} {...rest}>
<Sparkle />
{#if brand}
<span>with {#if typeof brand === 'string'}{brand}{:else}{@render brand()}{/if}</span>
{:else}
<span>after</span>
{/if}
<span>→</span>
</div>
