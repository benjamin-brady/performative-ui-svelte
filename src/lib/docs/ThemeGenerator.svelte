<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
	import Sparkle from '$lib/components/Sparkle.svelte';
	import EyebrowPill from '$lib/components/EyebrowPill.svelte';
	import StatusDot from '$lib/components/StatusDot.svelte';
	import GlassCard, {
		GlassCardIcon,
		GlassCardTitle,
		GlassCardBody,
		GlassCardLink
	} from '$lib/components/GlassCard.svelte';
	import {
		COLOR_GROUPS,
		FONT_PRESETS,
		PRESETS,
		DEFAULT_RADIUS_PX,
		defaultsFor,
		radiusScale,
		themeEntries,
		gradientPreview,
		buildThemeCss,
		type Base,
		type Preset
	} from './theme-presets';

	let base = $state<Base>('dark');
	let colors = $state<Record<string, string>>(defaultsFor('dark'));
	let radiusPx = $state(DEFAULT_RADIUS_PX);
	let fontSans = $state(FONT_PRESETS[0].value);
	let activePreset = $state<string>('performative');

	function applyPreset(preset: Preset) {
		base = preset.base;
		colors = { ...preset.colors };
		radiusPx = preset.radiusPx;
		fontSans = preset.font;
		activePreset = preset.id;
	}

	function selectBase(next: Base) {
		base = next;
		// Load that base's palette so the picker starts from sensible values.
		colors = defaultsFor(next);
		activePreset = '';
	}

	function reset() {
		applyPreset(PRESETS[0]);
	}

	function setColor(key: string, value: string) {
		colors[key] = value;
		activePreset = '';
	}

	let radii = $derived(radiusScale(radiusPx));

	let themeState = $derived({ base, colors, radiusPx, font: fontSans });

	// Inline custom-property string applied to the preview wrapper so the real
	// components resolve against the tweaked tokens.
	let previewStyle = $derived(
		themeEntries(themeState)
			.map(([k, v]) => `${k}: ${v};`)
			.join(' ')
	);

	let generatedCss = $derived(buildThemeCss(themeState));

	let copied = $state(false);
	async function copyCss() {
		try {
			await navigator.clipboard.writeText(generatedCss);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			/* clipboard blocked, fail silently */
		}
	}

	// Custom font picker so each option renders in its own typeface.
	let fontOpen = $state(false);
	let fontRoot: HTMLDivElement;
	let currentFont = $derived(FONT_PRESETS.find((f) => f.value === fontSans));
	function pickFont(value: string) {
		fontSans = value;
		activePreset = '';
		fontOpen = false;
	}
	$effect(() => {
		if (!fontOpen) return;
		const onDown = (e: MouseEvent) => {
			if (fontRoot && !fontRoot.contains(e.target as Node)) fontOpen = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') fontOpen = false;
		};
		document.addEventListener('mousedown', onDown);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDown);
			document.removeEventListener('keydown', onKey);
		};
	});
</script>

<div class="tg">
	<div class="tg__toolbar">
		<div class="tg__seg" role="group" aria-label="Base theme">
			<button
				type="button"
				class={'tg__seg-btn' + (base === 'dark' ? ' tg__seg-btn--active' : '')}
				aria-pressed={base === 'dark'}
				onclick={() => selectBase('dark')}>Dark</button
			>
			<button
				type="button"
				class={'tg__seg-btn' + (base === 'light' ? ' tg__seg-btn--active' : '')}
				aria-pressed={base === 'light'}
				onclick={() => selectBase('light')}>Light</button
			>
		</div>
		<button type="button" class="tg__reset" onclick={reset}>Reset</button>
	</div>

	<!-- Presets -->
	<div class="tg__presets">
		<span class="tg__presets-label">Presets</span>
		<div class="tg__presets-grid">
			{#each PRESETS as preset (preset.id)}
				<button
					type="button"
					class={'tg__preset' + (activePreset === preset.id ? ' tg__preset--active' : '')}
					aria-pressed={activePreset === preset.id}
					onclick={() => applyPreset(preset)}
				>
					<span
						class="tg__preset-swatch"
						style={`background: ${gradientPreview(preset.colors)};`}
					></span>
					<span class="tg__preset-name">{preset.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="tg__grid">
		<!-- Controls -->
		<div class="tg__controls">
			{#each COLOR_GROUPS as group (group.title)}
				<fieldset class="tg__group">
					<legend class="tg__group-title">{group.title}</legend>
					<div class="tg__swatches">
						{#each group.tokens as token (token.key)}
							<label class="tg__swatch">
								<input
									type="color"
									class="tg__color"
									value={colors[token.key]}
									oninput={(e) => setColor(token.key, e.currentTarget.value)}
									aria-label={token.label}
								/>
								<span class="tg__swatch-meta">
									<span class="tg__swatch-label">{token.label}</span>
									<span class="tg__swatch-hex">{colors[token.key]}</span>
								</span>
							</label>
						{/each}
					</div>
				</fieldset>
			{/each}

			<fieldset class="tg__group">
				<legend class="tg__group-title">Shape &amp; Type</legend>
				<div class="tg__field">
					<label class="tg__field-label" for="tg-radius">
						Corner radius <span class="tg__field-val">{radiusPx}px</span>
					</label>
					<input
						id="tg-radius"
						type="range"
						min="0"
						max="28"
						step="1"
						class="tg__range"
						bind:value={radiusPx}
					/>
				</div>
				<div class="tg__field">
					<span class="tg__field-label" id="tg-font-label">Sans font</span>
					<div class="tg__font" bind:this={fontRoot}>
						<button
							type="button"
							class="tg__font-trigger"
							aria-haspopup="listbox"
							aria-expanded={fontOpen}
							aria-labelledby="tg-font-label"
							onclick={() => (fontOpen = !fontOpen)}
						>
							<span class="tg__font-current" style={`font-family: ${fontSans};`}>
								{currentFont?.label ?? 'Custom'}
							</span>
							<svg
								class="tg__font-chevron"
								viewBox="0 0 24 24"
								width="14"
								height="14"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>
						{#if fontOpen}
							<ul class="tg__font-menu" role="listbox" aria-labelledby="tg-font-label">
								{#each FONT_PRESETS as f (f.label)}
									<li role="option" aria-selected={f.value === fontSans}>
										<button
											type="button"
											class={'tg__font-opt' +
												(f.value === fontSans ? ' tg__font-opt--active' : '')}
											style={`font-family: ${f.value};`}
											onclick={() => pickFont(f.value)}
										>
											<span class="tg__font-name">{f.label}</span>
											<span class="tg__font-kind">{f.kind}</span>
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			</fieldset>
		</div>

		<!-- Live preview -->
		<div class="tg__preview-wrap">
			<span class="tg__preview-tag">Live preview</span>
			<div class="tg__preview" data-theme={base} style={previewStyle}>
				<EyebrowPill>Now generally available</EyebrowPill>
				<h3 class="tg__preview-title">
					Ship <GradientText>agentic workflows</GradientText> <Sparkle />
				</h3>
				<p class="tg__preview-lede">
					Components that signal how oversubscribed your funding round is.
				</p>
				<div class="tg__preview-row">
					<Button variant="solid" size="sm">Generate</Button>
					<Button variant="glow" size="sm" sparkle>Deploy</Button>
					<Button variant="ghost" size="sm">Docs</Button>
				</div>
				<div class="tg__preview-dots">
					<span class="tg__dot"><StatusDot color="var(--pui-success)" /> Operational</span>
					<span class="tg__dot"><StatusDot color="var(--pui-warn)" /> Degraded</span>
					<span class="tg__dot"><StatusDot color="var(--pui-danger)" /> Down</span>
				</div>
				<GlassCard breathing={false} class="tg__preview-card">
					<GlassCardIcon>✦</GlassCardIcon>
					<GlassCardTitle>Reason</GlassCardTitle>
					<GlassCardBody>Multi-step, multi-modal, multi-vendor.</GlassCardBody>
					<GlassCardLink href="#">Learn more</GlassCardLink>
				</GlassCard>
			</div>
		</div>
	</div>

	<!-- Export -->
	<div class="tg__export">
		<div class="tg__export-head">
			<span class="tg__export-title">Theme CSS</span>
			<button type="button" class="tg__copy" onclick={copyCss}>{copied ? 'copied' : 'copy'}</button>
		</div>
		<pre class="tg__code">{generatedCss}</pre>
		<p class="tg__export-hint">
			Paste this into your <code>app.css</code> (after <code>@import "tailwindcss"</code>) to
			override the performative-ui tokens.
		</p>
	</div>
</div>
