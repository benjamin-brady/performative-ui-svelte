<script lang="ts" module>
	type Base = 'dark' | 'light';

	interface ColorToken {
		/** CSS custom property name without the leading `--`. */
		key: string;
		label: string;
		dark: string;
		light: string;
	}

	/** The user-facing color tokens, grouped for the control panel. */
	const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
		{
			title: 'Surfaces',
			tokens: [
				{ key: 'pui-bg', label: 'Background', dark: '#08080d', light: '#ffffff' },
				{ key: 'pui-bg-elev', label: 'Elevated', dark: '#11111a', light: '#f7f7f9' },
				{ key: 'pui-bg-soft', label: 'Soft', dark: '#191923', light: '#ededf1' },
				{ key: 'pui-border', label: 'Border', dark: '#2b2b39', light: '#e5e5ea' },
				{ key: 'pui-border-bright', label: 'Border bright', dark: '#383849', light: '#d2d2db' }
			]
		},
		{
			title: 'Text',
			tokens: [
				{ key: 'pui-fg', label: 'Foreground', dark: '#f5f5f8', light: '#16161d' },
				{ key: 'pui-fg-dim', label: 'Dimmed', dark: '#aaaab8', light: '#5b5b69' },
				{ key: 'pui-fg-mute', label: 'Muted', dark: '#76768b', light: '#919199' }
			]
		},
		{
			title: 'Gradient',
			tokens: [
				{ key: 'pui-grad-from', label: 'From', dark: '#7c3aed', light: '#7c3aed' },
				{ key: 'pui-grad-mid', label: 'Mid', dark: '#ec4899', light: '#ec4899' },
				{ key: 'pui-grad-to', label: 'To', dark: '#38bdf8', light: '#38bdf8' }
			]
		},
		{
			title: 'Semantic',
			tokens: [
				{ key: 'pui-success', label: 'Success', dark: '#22c55e', light: '#22c55e' },
				{ key: 'pui-danger', label: 'Danger', dark: '#f87171', light: '#f87171' },
				{ key: 'pui-warn', label: 'Warning', dark: '#fbbf24', light: '#fbbf24' }
			]
		}
	];

	const ALL_TOKENS = COLOR_GROUPS.flatMap((g) => g.tokens);

	const FONT_PRESETS: { label: string; value: string }[] = [
		{
			label: 'Inter',
			value: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif'
		},
		{
			label: 'System UI',
			value: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
		},
		{ label: 'Geist', value: '"Geist", ui-sans-serif, system-ui, sans-serif' },
		{ label: 'Satoshi', value: '"Satoshi", ui-sans-serif, system-ui, sans-serif' },
		{
			label: 'Mono',
			value: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace'
		}
	];

	/** Default base radius (in px); the original theme ships 0.75rem = 12px. */
	const DEFAULT_RADIUS_PX = 12;
</script>

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

	function defaultsFor(base: Base): Record<string, string> {
		return Object.fromEntries(ALL_TOKENS.map((t) => [t.key, base === 'dark' ? t.dark : t.light]));
	}

	let base = $state<Base>('dark');
	let colors = $state<Record<string, string>>(defaultsFor('dark'));
	let radiusPx = $state(DEFAULT_RADIUS_PX);
	let fontSans = $state(FONT_PRESETS[0].value);

	function selectBase(next: Base) {
		base = next;
		// Load that base's palette so the picker starts from sensible values.
		colors = defaultsFor(next);
	}

	function reset() {
		colors = defaultsFor(base);
		radiusPx = DEFAULT_RADIUS_PX;
		fontSans = FONT_PRESETS[0].value;
	}

	// Derive the four-step radius scale from a single slider, preserving the
	// original ratios (sm 0.667 · base 1 · lg 1.5 · xl 1.833).
	function rem(px: number): string {
		return `${Math.round((px / 16) * 1000) / 1000}rem`;
	}
	let radii = $derived({
		'pui-radius-sm': rem(radiusPx * 0.667),
		'pui-radius': rem(radiusPx),
		'pui-radius-lg': rem(radiusPx * 1.5),
		'pui-radius-xl': rem(radiusPx * 1.833)
	});

	// Every token, flattened — used for both the live preview and the export.
	let tokenEntries = $derived<[string, string][]>([
		...ALL_TOKENS.map((t): [string, string] => [t.key, colors[t.key]]),
		...Object.entries(radii),
		['pui-font-sans', fontSans]
	]);

	// Inline custom-property string applied to the preview wrapper so the real
	// components resolve against the tweaked tokens.
	let previewStyle = $derived(tokenEntries.map(([k, v]) => `--${k}: ${v};`).join(' '));

	let generatedCss = $derived.by(() => {
		const selector =
			base === 'dark' ? ':root,\n[data-theme="dark"]' : '[data-theme="light"]';
		const lines: string[] = [];
		lines.push('/* Generated with the performative-ui theme generator */');
		lines.push(`${selector} {`);
		lines.push(`  color-scheme: ${base};`);
		for (const group of COLOR_GROUPS) {
			lines.push(`  /* ${group.title} */`);
			for (const t of group.tokens) lines.push(`  --${t.key}: ${colors[t.key]};`);
		}
		lines.push('  /* Corner radius */');
		for (const [k, v] of Object.entries(radii)) lines.push(`  --${k}: ${v};`);
		lines.push('  /* Type */');
		lines.push(`  --pui-font-sans: ${fontSans};`);
		lines.push('}');
		return lines.join('\n');
	});

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
									oninput={(e) => (colors[token.key] = e.currentTarget.value)}
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
					<label class="tg__field-label" for="tg-font">Sans font</label>
					<select id="tg-font" class="tg__select" bind:value={fontSans}>
						{#each FONT_PRESETS as preset (preset.label)}
							<option value={preset.value}>{preset.label}</option>
						{/each}
					</select>
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
