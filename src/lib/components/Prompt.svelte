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

<form class={cn('pui-promptbox', className)} onsubmit={submit} {...rest}>
	<textarea
		class="pui-promptbox__textarea"
		value={value}
		oninput={(e) => setValue(e.currentTarget.value)}
		onkeydown={handleKey}
		{placeholder}
		{rows}
	></textarea>
	<div class="pui-promptbox__toolbar">
		{#if !hideAddContext}
			<button
				type="button"
				class="pui-promptbox__iconbtn"
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
			<div class="pui-promptbox__model-wrap" bind:this={modelWrapRef}>
				<button
					type="button"
					class="pui-promptbox__model"
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
					<div class="pui-promptbox__menu" role="menu">
						{#each models as m (m)}
							<button
								type="button"
								class={cn('pui-promptbox__menu-item', m === model && 'pui-promptbox__menu-item--active')}
								onclick={() => setModel(m)}
								role="menuitemradio"
								aria-checked={m === model}
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
		<div class="pui-promptbox__spacer"></div>
		{@render toolbarExtras?.()}
		{#if !hideVoice}
			<button
				type="button"
				class="pui-promptbox__iconbtn"
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
				class="pui-promptbox__iconbtn pui-promptbox__send"
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
