<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface GlassCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { class: className, children, ...rest }: GlassCardTitleProps = $props();
</script>

<h3 data-slot="glass-card-title" class={cn('mb-2 mt-0 text-[19px] tracking-[-0.01em] text-pui-fg', className)} {...rest}>{@render children?.()}</h3>
