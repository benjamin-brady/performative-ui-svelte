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

<div data-slot="pricing-amount" class={cn('mb-0.5 mt-2 text-[44px] font-extrabold tracking-[-0.035em]', className)} {...rest}>
{@render children?.()}
{#if typeof unit === 'string'}
<span data-slot="pricing-amount-unit" class="ml-1 text-sm font-medium text-pui-fg-mute">{unit}</span>
{:else if unit}
<span data-slot="pricing-amount-unit" class="ml-1 text-sm font-medium text-pui-fg-mute">{@render unit()}</span>
{/if}
</div>
