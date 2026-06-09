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

<div data-slot="glass-card-icon" class={cn('mb-[18px] inline-grid size-[38px] place-items-center rounded-[10px] border border-white/10 bg-[linear-gradient(135deg,oklch(0.541_0.251_293/0.25),oklch(0.656_0.242_354.3/0.15))] text-xl text-pui-fg', className)} {...rest}>{@render children?.()}</div>
