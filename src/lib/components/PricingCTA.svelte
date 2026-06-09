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

<a data-slot="pricing-cta" class={cn('relative inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-[var(--pui-button-dark-border)] bg-[var(--pui-button-dark-fill)] px-[18px] py-2.5 font-sans text-sm font-semibold text-pui-fg no-underline shadow-[var(--pui-glow)] transition-[transform,box-shadow,background,border-color] duration-200 ease-pui before:absolute before:inset-[-2px] before:-z-10 before:rounded-[12px] before:bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] before:bg-[length:300%_300%] before:opacity-55 before:blur-xl before:animate-[pui-grad-shift_5s_ease_infinite] hover:shadow-[var(--pui-glow-strong)] active:translate-y-px', className)} {...rest}>
<span>{@render children?.()}</span>
</a>
