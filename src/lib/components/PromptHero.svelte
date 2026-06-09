<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface PromptHeroProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
		placeholder?: string;
		/** Initial value of the input. */
		defaultValue?: string;
		/** Controlled value. If set, parent must pair with onChange. */
		value?: string;
		onChange?: (value: string) => void;
		/** Fires with the current value when the form submits. */
		onSubmit?: (value: string) => void;
		/** Replace the leading ✦ with a custom node, or pass `false` to remove. */
		leading?: Snippet | false;
		/** CTA label. Default: "Generate". */
		ctaLabel?: string | Snippet;
		/** Hide the trailing CTA. */
		hideCta?: boolean;
	}
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '$lib/utils/cn';
	import Button from './Button.svelte';
	import Sparkle from './Sparkle.svelte';

	let {
		placeholder = 'Describe what you want to build…',
		defaultValue,
		value,
		onChange,
		onSubmit,
		leading,
		ctaLabel = 'Generate',
		hideCta,
		class: className,
		...rest
	}: PromptHeroProps = $props();

	let isControlled = $derived(value !== undefined);
	let internal = $state(untrack(() => defaultValue ?? ''));
	let v = $derived(isControlled ? (value ?? '') : internal);

	function handle(e: SubmitEvent) {
		e.preventDefault();
		onSubmit?.(v);
	}

	function handleInput(e: Event) {
		const next = (e.currentTarget as HTMLInputElement).value;
		if (!isControlled) internal = next;
		onChange?.(next);
	}
</script>

<form data-slot="prompt-hero" class={cn('flex w-full items-center gap-2 rounded-2xl border border-pui-border-bright bg-[var(--pui-glass-deep)] py-2 pl-[18px] pr-2 shadow-[var(--pui-shadow-card),0_0_0_1px_oklch(0.541_0.251_293/0.18),0_0_32px_oklch(0.541_0.251_293/0.18)] backdrop-blur-[10px]', className)} onsubmit={handle} {...rest}>
	{#if leading !== false}
		<span data-slot="prompt-hero-icon" class="text-lg">
			{#if leading}{@render leading()}{:else}<Sparkle />{/if}
		</span>
	{/if}
	<input
		data-slot="prompt-hero-input"
		class="flex-1 border-0 bg-transparent py-3 font-sans text-[15px] text-pui-fg outline-0 placeholder:text-pui-fg-mute"
		type="text"
		{placeholder}
		aria-label={placeholder}
		value={v}
		oninput={handleInput}
		autocomplete="off"
	/>
	{#if !hideCta}
		<Button type="submit" variant="glow" sparkle>
			{#if typeof ctaLabel === 'string'}{ctaLabel}{:else}{@render ctaLabel?.()}{/if}
		</Button>
	{/if}
</form>
