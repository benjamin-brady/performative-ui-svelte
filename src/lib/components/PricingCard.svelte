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

<article data-slot="pricing-card" class={cn('relative flex h-full flex-col rounded-[var(--pui-radius-xl)] border border-pui-border-bright bg-pui-bg-elev px-7 py-[30px] font-sans text-pui-fg', featured && 'border-[oklch(0.541_0.251_293/0.55)] bg-[linear-gradient(180deg,oklch(0.541_0.251_293/0.08),var(--pui-bg-elev))] shadow-[0_0_80px_oklch(0.541_0.251_293/0.2)]', className)} {...rest}>
{@render children?.()}
</article>
