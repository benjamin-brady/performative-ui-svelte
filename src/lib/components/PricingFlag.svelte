<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface PricingFlagProps extends HTMLAttributes<HTMLDivElement> {
/** Hide the leading sparkle. */
hideSparkle?: boolean;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';
import Sparkle from './Sparkle.svelte';

let { hideSparkle = false, class: className, children, ...rest }: PricingFlagProps = $props();
</script>

<div data-slot="pricing-flag" class={cn('absolute left-1/2 top-[-12px] inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#1a1a26] shadow-[0_6px_24px_oklch(0.656_0.242_354.3/0.4)]', className)} {...rest}>
{#if !hideSparkle}<Sparkle solid />{/if}
<span>{@render children?.()}</span>
</div>
