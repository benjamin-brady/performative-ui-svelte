<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface PricingTierProps extends HTMLAttributes<HTMLDivElement> {
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { class: className, children, ...rest }: PricingTierProps = $props();
</script>

<div data-slot="pricing-tier" class={cn('font-mono text-xs uppercase tracking-[0.12em] text-pui-fg-dim', className)} {...rest}>{@render children?.()}</div>
