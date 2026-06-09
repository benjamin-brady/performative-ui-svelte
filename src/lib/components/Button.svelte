<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type ButtonVariant = 'glow' | 'shimmer' | 'ghost' | 'solid' | 'wave';
	export type ButtonSize = 'sm' | 'md' | 'lg';

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
		type = 'button',
		class: className,
		disabled = false,
		children,
		...rest
	}: ButtonProps = $props();

	let isButton = $derived(as === 'button');

	// svelte:element exposes only generic HTMLAttributes, so `disabled` and
	// `type` are applied via a spread record rather than direct attributes.
	let attrs = $derived({
		...rest,
		type: isButton ? type : undefined,
		disabled: isButton ? disabled || loading : undefined,
		'aria-busy': loading || undefined
	} as Record<string, unknown>);
</script>

<svelte:element
	this={as}
	class={cn(
		'pui-btn',
		`pui-btn--${variant}`,
		size !== 'md' && `pui-btn--${size}`,
		block && 'pui-btn--block',
		className
	)}
	{...attrs}
>
	{#if loading}<span class="pui-btn__spinner" aria-hidden="true"></span>{/if}
	<span>{@render children?.()}</span>
	{#if sparkle}<Sparkle />{/if}
</svelte:element>
