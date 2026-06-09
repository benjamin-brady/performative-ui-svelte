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

<div class={cn('pui-price__flag', className)} {...rest}>
{#if !hideSparkle}<Sparkle solid />{/if}
<span>{@render children?.()}</span>
</div>
