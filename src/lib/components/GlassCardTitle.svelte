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

<h3 class={cn('pui-glass-card__title', className)} {...rest}>{@render children?.()}</h3>
