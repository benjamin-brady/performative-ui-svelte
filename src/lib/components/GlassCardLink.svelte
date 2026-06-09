<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface GlassCardLinkProps extends HTMLAnchorAttributes {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { class: className, children, ...rest }: GlassCardLinkProps = $props();
</script>

<a class={cn('pui-glass-card__link', className)} {...rest}>
	<span>{@render children?.()}</span>
	<span class="pui-arrow">→</span>
</a>
