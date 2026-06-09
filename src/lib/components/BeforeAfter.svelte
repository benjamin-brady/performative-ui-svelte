<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export { default as BeforeAfterAfter } from './BeforeAfterAfter.svelte';
export { default as BeforeAfterArrow } from './BeforeAfterArrow.svelte';
export { default as BeforeAfterBefore } from './BeforeAfterBefore.svelte';

export interface BeforeAfterProps extends HTMLAttributes<HTMLDivElement> {
/** Quick form: pass arrays and get the canonical layout. */
before?: Content[];
after?: Content[];
/** Brand name shown over the arrow ("with Synthetica"). */
brand?: Content;
/** Optional override labels. */
beforeLabel?: Content;
afterLabel?: Content;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';
import BeforePanel from './BeforeAfterBefore.svelte';
import AfterPanel from './BeforeAfterAfter.svelte';
import Arrow from './BeforeAfterArrow.svelte';

let {
before,
after,
brand,
beforeLabel = 'Before',
afterLabel = 'After',
class: className,
children,
...rest
}: BeforeAfterProps = $props();
</script>

<div data-slot="before-after" class={cn('grid grid-cols-1 items-stretch gap-[18px] font-sans md:grid-cols-[1fr_auto_1fr]', className)} {...rest}>
{#if children}
{@render children()}
{:else}
<BeforePanel label={beforeLabel}>
<ul>
{#each before ?? [] as item, i (i)}
<li>{#if typeof item === 'string'}{item}{:else if item}{@render item()}{/if}</li>
{/each}
</ul>
</BeforePanel>
<Arrow {brand} />
<AfterPanel label={afterLabel}>
<ul>
{#each after ?? [] as item, i (i)}
<li>{#if typeof item === 'string'}{item}{:else if item}{@render item()}{/if}</li>
{/each}
</ul>
</AfterPanel>
{/if}
</div>
