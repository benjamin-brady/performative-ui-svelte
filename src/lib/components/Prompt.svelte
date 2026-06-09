<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface PromptProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
		/* ----- text ----- */
		value?: string;
		defaultValue?: string;
		onChange?: (value: string) => void;
		/** Fires when the form submits. Receives the text + a context blob. */
		onSubmit?: (value: string, ctx: { model?: string }) => void;
		placeholder?: string;
		/** Initial textarea height (rows). */
		rows?: number;

		/* ----- model dropdown ----- */
		models?: string[];
		model?: string;
		defaultModel?: string;
		onModelChange?: (model: string) => void;

		/* ----- toolbar callbacks ----- */
		onAddContext?: () => void;
		onVoice?: () => void;

		/* ----- hide bits ----- */
		hideAddContext?: boolean;
		hideModel?: boolean;
		hideVoice?: boolean;
		hideSend?: boolean;

		/** Cmd/Ctrl+Enter inside the textarea submits. Default true. */
		submitOnCmdEnter?: boolean;

		/** Optional node rendered in the right side of the toolbar before the
		 *  voice + send buttons (e.g. a "Cmd+↵" keyboard hint). */
		toolbarExtras?: Snippet;
	}
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '$lib/utils/cn';

	const DEFAULT_MODELS = ['GPT-5 Turbo Vision', 'Claude Opus 4.7', 'Gemini 3 Pro'];

	let {
		value: controlledValue,
		defaultValue = '',
		onChange,
		onSubmit,
		placeholder = 'Build me a…',
		rows = 3,
		models = DEFAULT_MODELS,
		model: controlledModel,
		defaultModel,
		onModelChange,
		onAddContext,
		onVoice,
		hideAddContext,
		hideModel,
		hideVoice,
		hideSend,
		submitOnCmdEnter = true,
		toolbarExtras,
		class: className,
		...rest
	}: PromptProps = $props();

	let isControlledValue = $derived(controlledValue !== undefined);
	let internalValue = $state(untrack(() => defaultValue));
	let value = $derived(isControlledValue ? (controlledValue ?? '') : internalValue);

	let isControlledModel = $derived(controlledModel !== undefined);
	let internalModel = $state(untrack(() => defaultModel ?? models[0] ?? ''));
	let model = $derived(isControlledModel ? (controlledModel ?? '') : internalModel);

	let menuOpen = $state(false);
	let modelWrapRef: HTMLDivElement | undefined = $state();
	let menuRef: HTMLDivElement | undefined = $state();
	let modelButtonRef: HTMLButtonElement | undefined = $state();

	$effect(() => {
		if (!menuOpen) return;
		const onDown = (e: MouseEvent) => {
			if (!modelWrapRef?.contains(e.target as Node)) {
				menuOpen = false;
			}
		};
		document.addEventListener('mousedown', onDown);
		return () => document.removeEventListener('mousedown', onDown);
	});

	$effect(() => {
		if (!menuOpen || !menuRef) return;
		const active =
			menuRef.querySelector<HTMLElement>('[aria-checked="true"]') ??
			menuRef.querySelector<HTMLElement>('[role="menuitemradio"]');
		active?.focus();
	});

	function setValue(v: string) {
		if (!isControlledValue) internalValue = v;
		onChange?.(v);
	}
	function setModel(m: string) {
		if (!isControlledModel) internalModel = m;
		onModelChange?.(m);
		menuOpen = false;
	}

	function submit(e?: SubmitEvent) {
		e?.preventDefault();
		onSubmit?.(value, { model });
	}
	function handleKey(e: KeyboardEvent) {
		if (submitOnCmdEnter && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			submit();
		}
	}
</script>

<form data-slot="prompt" class={cn('flex w-full max-w-[720px] flex-col gap-2.5 rounded-[18px] border border-pui-border-bright bg-[var(--pui-glass)] px-3.5 pb-2.5 pt-3.5 font-sans shadow-[var(--pui-shadow-card),0_0_0_1px_oklch(0.541_0.251_293/0.18),0_0_32px_oklch(0.541_0.251_293/0.18)] backdrop-blur-[10px]', className)} onsubmit={submit} {...rest}>
	<textarea
		data-slot="prompt-textarea"
		class="min-h-[60px] w-full resize-none border-0 bg-transparent px-1 pb-0 pt-1 font-[inherit] text-[15px] leading-normal text-pui-fg outline-0 placeholder:text-pui-fg-mute"
		value={value}
		oninput={(e) => setValue(e.currentTarget.value)}
		onkeydown={handleKey}
		{placeholder}
		aria-label={placeholder}
		{rows}
	></textarea>
	<div data-slot="prompt-toolbar" class="flex items-center gap-1.5">
		{#if !hideAddContext}
			<button
				type="button"
				class="inline-flex size-[30px] cursor-pointer items-center justify-center rounded-lg border border-pui-border-bright bg-[var(--pui-overlay)] p-0 text-pui-fg-dim transition-[background,color,border-color,box-shadow,transform] duration-150 ease-pui hover:border-[#3a3a4e] hover:bg-[var(--pui-overlay-strong)] hover:text-pui-fg active:translate-y-px"
				onclick={onAddContext}
				title="Add context"
				aria-label="Add context"
			>
				<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
					<path d="M12 5v14M5 12h14" />
				</svg>
			</button>
		{/if}
		{#if !hideModel && models.length > 0}
			<div data-slot="prompt-model-wrap" class="relative" bind:this={modelWrapRef}>
				<button
					type="button"
					class="inline-flex h-[30px] cursor-pointer items-center gap-1.5 rounded-lg border border-pui-border-bright bg-[var(--pui-overlay)] py-0 pl-3 pr-2.5 font-mono text-[12.5px] text-pui-fg-dim transition-[background,color,border-color] duration-150 ease-pui hover:border-[#3a3a4e] hover:bg-[var(--pui-overlay-strong)] hover:text-pui-fg"
					bind:this={modelButtonRef}
					onclick={() => (menuOpen = !menuOpen)}
					aria-expanded={menuOpen}
					aria-haspopup="menu"
				>
					<span>{model}</span>
					<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>
				{#if menuOpen}
					<div data-slot="prompt-menu" class="absolute bottom-[calc(100%+6px)] left-0 z-10 min-w-[220px] rounded-xl border border-pui-border-bright bg-pui-bg-elev p-1 shadow-[var(--pui-shadow-deep),0_0_0_1px_oklch(0.541_0.251_293/0.10)]" role="menu" tabindex="-1" bind:this={menuRef} onkeydown={(e) => {
							const itemsEls = Array.from(
								(e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="menuitemradio"]')
							);
							const idx = itemsEls.indexOf(document.activeElement as HTMLElement);
							if (e.key === 'ArrowDown') {
								e.preventDefault();
								itemsEls[(idx + 1) % itemsEls.length]?.focus();
							} else if (e.key === 'ArrowUp') {
								e.preventDefault();
								itemsEls[(idx - 1 + itemsEls.length) % itemsEls.length]?.focus();
							} else if (e.key === 'Escape') {
								e.preventDefault();
								menuOpen = false;
								modelButtonRef?.focus();
							}
						}}>
						{#each models as m (m)}
							<button
								type="button"
								class={cn('flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border-0 bg-transparent px-3 py-2 text-left font-mono text-[13px] text-pui-fg transition-colors duration-100 ease-pui hover:bg-[oklch(0.541_0.251_293/0.14)]', m === model && 'bg-[linear-gradient(180deg,oklch(0.541_0.251_293/0.18),oklch(0.656_0.242_354.3/0.06))] hover:bg-[linear-gradient(180deg,oklch(0.541_0.251_293/0.22),oklch(0.656_0.242_354.3/0.10))]')}
								onclick={() => setModel(m)}
								role="menuitemradio"
								aria-checked={m === model}
								tabindex={m === model ? 0 : -1}
							>
								<span>{m}</span>
								{#if m === model}
									<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		<div data-slot="prompt-spacer" class="flex-1"></div>
		{@render toolbarExtras?.()}
		{#if !hideVoice}
			<button
				type="button"
				class="inline-flex size-[30px] cursor-pointer items-center justify-center rounded-lg border border-pui-border-bright bg-[var(--pui-overlay)] p-0 text-pui-fg-dim transition-[background,color,border-color,box-shadow,transform] duration-150 ease-pui hover:border-[#3a3a4e] hover:bg-[var(--pui-overlay-strong)] hover:text-pui-fg active:translate-y-px"
				onclick={onVoice}
				title="Voice mode"
				aria-label="Voice mode"
			>
				<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<rect x="9" y="2" width="6" height="12" rx="3" />
					<path d="M19 10a7 7 0 0 1-14 0" />
					<line x1="12" y1="19" x2="12" y2="22" />
				</svg>
			</button>
		{/if}
		{#if !hideSend}
			<button
				type="submit"
				class="inline-flex size-[30px] animate-[pui-grad-shift_6s_ease_infinite] cursor-pointer items-center justify-center rounded-lg border border-transparent bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] bg-[length:200%_200%] p-0 text-[#0a0a12] transition-[background,color,border-color,box-shadow,transform] duration-150 ease-pui hover:border-transparent hover:bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] hover:bg-[length:200%_200%] hover:text-[#0a0a12] hover:shadow-[0_0_18px_oklch(0.541_0.251_293/0.55)] active:translate-y-px"
				title="Send"
				aria-label="Send"
			>
				<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="12" y1="19" x2="12" y2="5" />
					<polyline points="5 12 12 5 19 12" />
				</svg>
			</button>
		{/if}
	</div>
</form>
