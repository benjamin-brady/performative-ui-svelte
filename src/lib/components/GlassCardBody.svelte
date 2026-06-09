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

<p class={cn('pui-glass-card__body', className)} {...rest}>{@render children?.()}</p>
