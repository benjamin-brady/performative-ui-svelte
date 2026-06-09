<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface PricingFeaturesProps extends HTMLAttributes<HTMLUListElement> {
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { class: className, children, ...rest }: PricingFeaturesProps = $props();
</script>

<ul data-slot="pricing-features" class={cn('mb-6 mt-0 flex-1 list-none p-0 [&_li]:border-t [&_li]:border-dashed [&_li]:border-pui-border [&_li]:py-[9px] [&_li]:text-[13.5px] [&_li]:text-pui-fg-dim [&_li]:before:mr-1.5 [&_li]:before:font-bold [&_li]:before:text-pui-success [&_li]:before:content-["✓"]', className)} {...rest}>{@render children?.()}</ul>
