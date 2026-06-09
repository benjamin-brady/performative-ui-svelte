<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--pui-radius)] border text-sm font-semibold outline-none transition-all duration-200 ease-pui active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 disabled:active:translate-y-0 aria-busy:cursor-wait aria-busy:active:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-55 aria-disabled:active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		variants: {
			variant: {
				glow: 'border-[var(--pui-button-dark-border)] [background:var(--pui-button-dark-fill)] text-pui-fg shadow-[var(--pui-glow)] before:absolute before:inset-[-2px] before:-z-10 before:rounded-[calc(var(--pui-radius)+2px)] before:bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] before:bg-[length:300%_300%] before:opacity-55 before:blur-xl before:animate-[pui-grad-shift_5s_ease_infinite] hover:shadow-[var(--pui-glow-strong)]',
				shimmer: 'overflow-hidden border-pui-border-bright [background:var(--pui-button-dark-fill)] text-pui-fg after:absolute after:inset-y-0 after:left-[-120%] after:w-1/2 after:skew-x-[-18deg] after:bg-white/25 after:blur-sm after:animate-[pui-shimmer_2.6s_ease-in-out_infinite]',
				ghost: 'border-pui-border-bright bg-transparent text-pui-fg hover:border-pui-fg-mute hover:bg-pui-bg-elev',
				solid: 'border-transparent bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] bg-[length:200%_200%] text-pui-bg shadow-[0_12px_30px_oklch(0.6_0.23_295/0.24)]',
				wave: 'isolate overflow-visible rounded-full border-x border-t border-b-2 border-[oklch(0.72_0.09_260/0.25)] bg-[linear-gradient(var(--pui-bg-elev),var(--pui-bg-elev)),linear-gradient(var(--pui-bg-elev)_50%,var(--pui-bg-elev)_80%,transparent_100%),linear-gradient(90deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to),var(--pui-grad-mid),var(--pui-grad-from))] bg-[length:200%,200%,200%] bg-[position:0%_50%,0%_50%,-100%_50%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box,border-box,border-box] text-[oklch(0.82_0.055_260)] animate-[pui-wave-shift_2s_linear_infinite] before:absolute before:bottom-[-4px] before:left-1/2 before:-z-10 before:h-[5px] before:w-[88%] before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to),var(--pui-grad-mid),var(--pui-grad-from))] before:bg-[length:200%_100%] before:blur-lg before:animate-[pui-wave-shift_3s_linear_infinite] hover:border-[oklch(0.72_0.09_260/0.35)] hover:text-[oklch(0.9_0.035_260)] disabled:border-pui-border disabled:text-pui-fg-mute disabled:animate-none disabled:before:hidden aria-busy:border-pui-border aria-busy:text-pui-fg-mute aria-busy:animate-none aria-busy:before:hidden aria-disabled:border-pui-border aria-disabled:text-pui-fg-mute aria-disabled:animate-none aria-disabled:before:hidden'
			},
			size: {
				sm: 'h-8 px-3 text-[13px]',
				md: 'h-10 px-[18px]',
				lg: 'h-12 px-6 text-[15px]'
			},
			block: {
				true: 'w-full'
			}
		},
		defaultVariants: {
			variant: 'glow',
			size: 'md'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export interface ButtonProps extends HTMLAttributes<HTMLElement> {
		variant?: ButtonVariant;
		size?: ButtonSize;
		/** Render a ✦ to the right of the label. */
		sparkle?: boolean;
		/** Show a spinner and disable. */
		loading?: boolean;
		/** Full-width. */
		block?: boolean;
		/** Override the rendered tag (e.g. 'a'). */
		as?: string;
		/** Native disabled (only applied when rendering a <button>). */
		disabled?: boolean;
		/** Native href, when rendered as an anchor. */
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import Sparkle from './Sparkle.svelte';

	let {
		variant = 'glow',
		size = 'md',
		sparkle = false,
		loading = false,
		block = false,
		as = 'button',
		class: className,
		disabled = false,
		children,
		...rest
	}: ButtonProps = $props();

	let isButton = $derived(as === 'button');

	// svelte:element exposes only generic HTMLAttributes, so `disabled` is
	// applied via a spread record rather than a direct attribute.
	let attrs = $derived({
		...rest,
		disabled: isButton ? disabled || loading : undefined,
		'aria-busy': loading || undefined
	} as Record<string, unknown>);
</script>

<svelte:element
	this={as}
	data-slot="button"
	class={cn(buttonVariants({ variant, size, block }), className)}
	{...attrs}
>
	{#if loading}
		<span
			class="inline-block size-3 rounded-full border-[1.5px] border-white/25 border-t-current animate-[pui-spin_0.9s_linear_infinite]"
			aria-hidden="true"
		></span>
	{/if}
	<span>{@render children?.()}</span>
	{#if sparkle}<Sparkle />{/if}
</svelte:element>
