<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface GlassCardIconProps extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { class: className, children, ...rest }: GlassCardIconProps = $props();
</script>

<div class={cn('pui-glass-card__icon', className)} {...rest}>{@render children?.()}</div>
