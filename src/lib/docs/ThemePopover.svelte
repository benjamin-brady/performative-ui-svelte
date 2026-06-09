<script lang="ts">
	import { browser } from '$app/environment';
	import { PersistedState } from 'runed';
	import {
		PRESETS,
		FONT_PRESETS,
		DEFAULT_RADIUS_PX,
		defaultsFor,
		themeEntries,
		gradientPreview,
		buildThemeCss,
		type Base,
		type Preset,
		type ThemeState
	} from './theme-presets';

	let {
		base = $bindable('dark')
	}: {
		/** The site's dark/light base, owned by the layout's theme store. */
		base: Base;
	} = $props();

	// Which preset is applied site-wide. 'default' = stock theme (no overrides).
	const activeId = new PersistedState<string>('pui-site-theme', 'default');
	let open = $state(false);

	// Stable list of every custom-property name we ever set, for clean removal.
	const PROP_NAMES = themeEntries({
		base: 'dark',
		colors: defaultsFor('dark'),
		radiusPx: DEFAULT_RADIUS_PX,
		font: FONT_PRESETS[0].value
	}).map(([k]) => k);

	let activePreset = $derived(PRESETS.find((p) => p.id === activeId.current) ?? null);

	function stateOf(preset: Preset): ThemeState {
		return { base: preset.base, colors: preset.colors, radiusPx: preset.radiusPx, font: preset.font };
	}

	let activeState = $derived<ThemeState>(
		activePreset
			? stateOf(activePreset)
			: { base, colors: defaultsFor(base), radiusPx: DEFAULT_RADIUS_PX, font: FONT_PRESETS[0].value }
	);

	// Push the active preset's tokens onto <html> (inline props win over the
	// stylesheet). 'default' clears them so the stock theme + toggle take over.
	$effect(() => {
		if (!browser) return;
		const el = document.documentElement;
		const preset = PRESETS.find((p) => p.id === activeId.current);
		if (preset) {
			for (const [k, v] of themeEntries(stateOf(preset))) el.style.setProperty(k, v);
		} else {
			for (const k of PROP_NAMES) el.style.removeProperty(k);
		}
	});

	function applyPreset(preset: Preset) {
		activeId.current = preset.id;
		base = preset.base; // keep the layout's dark/light toggle in sync
	}

	function useDefault() {
		activeId.current = 'default';
	}

	let copied = $state(false);
	async function copyCss() {
		try {
			await navigator.clipboard.writeText(buildThemeCss(activeState));
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			/* clipboard blocked, fail silently */
		}
	}

	// Close on outside click / Escape.
	let root: HTMLDivElement;
	$effect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (root && !root.contains(e.target as Node)) open = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		document.addEventListener('mousedown', onDown);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDown);
			document.removeEventListener('keydown', onKey);
		};
	});
</script>

<div class="tpop" bind:this={root}>
	<button
		type="button"
		class="sidebar__theme-toggle"
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-label="Theme settings"
		title="Theme settings"
		onclick={() => (open = !open)}
	>
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
			<path
				d="M12 2C6.5 2 2 6 2 11c0 4.5 3.5 7 7 7 1.5 0 2-1 2-2 0-.5-.3-1-.3-1.5 0-.8.7-1.5 1.5-1.5H14c4 0 6-2.5 6-6 0-3.9-3.6-6-8-6z"
			/>
		</svg>
	</button>

	{#if open}
		<div class="tpop__panel" role="dialog" aria-label="Theme settings">
			<div class="tpop__head">
				<span class="tpop__title">Theme</span>
				<button type="button" class="tpop__copy" onclick={copyCss}>
					{copied ? 'copied' : 'copy CSS'}
				</button>
			</div>
			<div class="tpop__grid">
				<button
					type="button"
					class={'tpop__item' + (activeId.current === 'default' ? ' tpop__item--active' : '')}
					aria-pressed={activeId.current === 'default'}
					onclick={useDefault}
				>
					<span class="tpop__swatch tpop__swatch--default"></span>
					<span class="tpop__name">Default</span>
				</button>
				{#each PRESETS as preset (preset.id)}
					<button
						type="button"
						class={'tpop__item' + (activeId.current === preset.id ? ' tpop__item--active' : '')}
						aria-pressed={activeId.current === preset.id}
						onclick={() => applyPreset(preset)}
					>
						<span class="tpop__swatch" style={`background: ${gradientPreview(preset.colors)};`}
						></span>
						<span class="tpop__name">{preset.name}</span>
					</button>
				{/each}
			</div>
			<p class="tpop__hint">Re-skins the whole site. Copy grabs the matching CSS.</p>
		</div>
	{/if}
</div>
