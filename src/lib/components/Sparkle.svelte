<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SparkleProps extends HTMLAttributes<HTMLSpanElement> {
		/** The glyph to render. Default: ✦. */
		glyph?: string;
		/** Skip the gradient fill (renders in currentColor). */
		solid?: boolean;
		/** Stop the twinkle animation. */
		static?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let {
		glyph = '✦',
		solid = false,
		static: isStatic = false,
		class: className,
		children,
		...rest
	}: SparkleProps = $props();
</script>

<span
	aria-hidden="true"
	data-slot="sparkle"
	class={cn(
		'inline-block bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] bg-clip-text font-bold text-transparent',
		!isStatic && 'animate-[pui-twinkle_2.4s_ease-in-out_infinite]',
		solid && 'bg-none text-current',
		className
	)}
	{...rest}
>{glyph}{@render children?.()}</span>
