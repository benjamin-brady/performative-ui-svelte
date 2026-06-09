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

<ul class={cn('pui-price__features', className)} {...rest}>{@render children?.()}</ul>
