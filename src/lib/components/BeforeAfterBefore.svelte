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

<div class={cn('pui-ba__panel pui-ba__panel--before', className)} {...rest}>
<div class="pui-ba__tag">
{#if typeof label === 'string'}{label}{:else if label}{@render label()}{/if}
</div>
{@render children?.()}
</div>
