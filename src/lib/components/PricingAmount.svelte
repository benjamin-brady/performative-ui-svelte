<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export interface PricingAmountProps extends HTMLAttributes<HTMLDivElement> {
/** Suffix like "/mo". Renders smaller, dimmer. */
unit?: Content;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { unit, class: className, children, ...rest }: PricingAmountProps = $props();
</script>

<div class={cn('pui-price__amount', className)} {...rest}>
{@render children?.()}
{#if typeof unit === 'string'}
<span class="pui-price__amount-unit">{unit}</span>
{:else if unit}
<span class="pui-price__amount-unit">{@render unit()}</span>
{/if}
</div>
