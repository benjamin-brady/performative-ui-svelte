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
	class={cn('pui-sparkle', !isStatic && 'pui-sparkle--blink', solid && 'pui-sparkle--solid', className)}
	{...rest}
>{glyph}{@render children?.()}</span>
