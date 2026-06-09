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

<a data-slot="glass-card-link" class={cn('group/card-link inline-flex items-center gap-1.5 border-b border-white/15 pb-0.5 text-[13px] text-pui-fg no-underline', className)} {...rest}>
	<span>{@render children?.()}</span>
	<span data-slot="glass-card-link-arrow" class="inline-block transition-transform duration-200 ease-pui group-hover/card-link:translate-x-1">→</span>
</a>
