<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface PricingBlurbProps extends HTMLAttributes<HTMLParagraphElement> {
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { class: className, children, ...rest }: PricingBlurbProps = $props();
</script>

<p data-slot="pricing-blurb" class={cn('mb-[22px] mt-0 text-[13px] text-pui-fg-dim', className)} {...rest}>{@render children?.()}</p>
