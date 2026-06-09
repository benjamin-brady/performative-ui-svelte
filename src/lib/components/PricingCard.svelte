<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export { default as PricingAmount } from './PricingAmount.svelte';
export { default as PricingBlurb } from './PricingBlurb.svelte';
export { default as PricingCTA } from './PricingCTA.svelte';
export { default as PricingFeatures } from './PricingFeatures.svelte';
export { default as PricingFlag } from './PricingFlag.svelte';
export { default as PricingTier } from './PricingTier.svelte';

export interface PricingCardProps extends HTMLAttributes<HTMLElement> {
/** Apply the "Pro" tier glow + lift. */
featured?: boolean;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { featured = false, class: className, children, ...rest }: PricingCardProps = $props();
</script>

<article class={cn('pui-price', featured && 'pui-price--featured', className)} {...rest}>
{@render children?.()}
</article>
