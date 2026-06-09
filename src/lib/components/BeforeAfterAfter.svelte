<script lang="ts" module>
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Content = string | Snippet;

export interface BeforeAfterAfterProps extends HTMLAttributes<HTMLDivElement> {
label?: Content;
children?: Snippet;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let { label = 'After', class: className, children, ...rest }: BeforeAfterAfterProps = $props();
</script>

<div data-slot="before-after-after" class={cn('rounded-[var(--pui-radius-xl)] border border-[oklch(0.541_0.251_293/0.45)] bg-[linear-gradient(180deg,oklch(0.541_0.251_293/0.06),var(--pui-bg-elev))] p-7 text-pui-fg shadow-[0_0_60px_oklch(0.541_0.251_293/0.2)] [&_li]:border-b [&_li]:border-dashed [&_li]:border-pui-border [&_li]:py-3 [&_li]:text-[15px] [&_li]:text-pui-fg [&_li:last-child]:border-b-0 [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0', className)} {...rest}>
<div data-slot="before-after-tag" class="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-pui-fg-mute">
{#if typeof label === 'string'}{label}{:else if label}{@render label()}{/if}
</div>
{@render children?.()}
</div>
