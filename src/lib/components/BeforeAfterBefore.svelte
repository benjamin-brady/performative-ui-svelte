<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export interface BeforeAfterBeforeProps extends HTMLAttributes<HTMLDivElement> {
label?: Content;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { label = 'Before', class: className, children, ...rest }: BeforeAfterBeforeProps = $props();
</script>

<div data-slot="before-after-before" class={cn('rounded-[var(--pui-radius-xl)] border border-pui-border bg-pui-bg-elev p-7 text-pui-fg opacity-55 grayscale-[45%] [&_li]:border-b [&_li]:border-dashed [&_li]:border-pui-border [&_li]:py-3 [&_li]:text-[15px] [&_li]:text-pui-fg-dim [&_li]:line-through [&_li]:decoration-white/25 [&_li:last-child]:border-b-0 [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0', className)} {...rest}>
<div data-slot="before-after-tag" class="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-pui-fg-mute">
{#if typeof label === 'string'}{label}{:else if label}{@render label()}{/if}
</div>
{@render children?.()}
</div>
