<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface PricingCTAProps extends HTMLAttributes<HTMLAnchorElement> {
href?: string;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { class: className, children, ...rest }: PricingCTAProps = $props();
</script>

<a class={cn('pui-btn pui-btn--glow pui-btn--block', className)} {...rest}>
<span>{@render children?.()}</span>
</a>
