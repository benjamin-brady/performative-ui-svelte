<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface GlassCardBodyProps extends HTMLAttributes<HTMLParagraphElement> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { class: className, children, ...rest }: GlassCardBodyProps = $props();
</script>

<p data-slot="glass-card-body" class={cn('mb-[18px] mt-0 text-sm leading-[1.6] text-pui-fg-dim', className)} {...rest}>{@render children?.()}</p>
