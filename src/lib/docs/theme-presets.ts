/**
 * Shared theme-token data for the docs theming tools.
 *
 * Both the on-page Theme Generator and the nav-bar theme-settings popover
 * read from here so the token list, defaults, presets and CSS serialiser
 * stay in one place.
 */

export type Base = 'dark' | 'light';

export interface ColorToken {
	/** CSS custom property name without the leading `--`. */
	key: string;
	label: string;
	dark: string;
	light: string;
}

/** The user-facing color tokens, grouped for the control panel. */
export const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
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

export const ALL_TOKENS = COLOR_GROUPS.flatMap((g) => g.tokens);

export interface FontPreset {
	label: string;
	value: string;
	/** Coarse classification, shown as a muted tag in the font picker. */
	kind: 'Sans' | 'Serif' | 'Mono';
}

export const FONT_PRESETS: FontPreset[] = [
	{ label: 'Inter', kind: 'Sans', value: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif' },
	{ label: 'Figtree', kind: 'Sans', value: '"Figtree", ui-sans-serif, system-ui, sans-serif' },
	{ label: 'Hanken Grotesk', kind: 'Sans', value: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif' },
	{ label: 'Space Grotesk', kind: 'Sans', value: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif' },
	{ label: 'DM Sans', kind: 'Sans', value: '"DM Sans", ui-sans-serif, system-ui, sans-serif' },
	{ label: 'Montserrat', kind: 'Sans', value: '"Montserrat", ui-sans-serif, system-ui, sans-serif' },
	{ label: 'System UI', kind: 'Sans', value: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
	{ label: 'Fraunces', kind: 'Serif', value: '"Fraunces", ui-serif, Georgia, serif' },
	{ label: 'Newsreader', kind: 'Serif', value: '"Newsreader", ui-serif, Georgia, serif' },
	{ label: 'Spectral', kind: 'Serif', value: '"Spectral", ui-serif, Georgia, serif' },
	{ label: 'JetBrains Mono', kind: 'Mono', value: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace' }
];

/** Look up a font stack by its picker label. */
export function fontStack(label: string): string {
	return FONT_PRESETS.find((f) => f.label === label)?.value ?? FONT_PRESETS[0].value;
}

/** Default base radius (in px); the original theme ships 0.75rem = 12px. */
export const DEFAULT_RADIUS_PX = 12;

export function defaultsFor(base: Base): Record<string, string> {
	return Object.fromEntries(ALL_TOKENS.map((t) => [t.key, base === 'dark' ? t.dark : t.light]));
}

export interface ThemeState {
	base: Base;
	colors: Record<string, string>;
	radiusPx: number;
	font: string;
}

export interface Preset {
	id: string;
	name: string;
	base: Base;
	/** Accent tokens (gradient + semantic) — mode-independent, always applied. */
	accent: Record<string, string>;
	/** Surface/text overrides for the preset's own base. */
	surfaces: Record<string, string>;
	/** Fully-resolved palette for the preset's own base (preview + swatch). */
	colors: Record<string, string>;
	radiusPx: number;
	font: string;
}

/** Tokens that re-tint the accent rather than the surfaces; safe in both modes. */
const ACCENT_KEYS = new Set([
	'pui-grad-from',
	'pui-grad-mid',
	'pui-grad-to',
	'pui-success',
	'pui-danger',
	'pui-warn'
]);

/** Build a preset, splitting overrides into accent vs surface tokens. */
function mk(
	id: string,
	name: string,
	base: Base,
	overrides: Record<string, string>,
	opts: { radiusPx?: number; font?: string } = {}
): Preset {
	const accent: Record<string, string> = {};
	const surfaces: Record<string, string> = {};
	for (const [k, v] of Object.entries(overrides)) {
		(ACCENT_KEYS.has(k) ? accent : surfaces)[k] = v;
	}
	return {
		id,
		name,
		base,
		accent,
		surfaces,
		colors: { ...defaultsFor(base), ...overrides },
		radiusPx: opts.radiusPx ?? DEFAULT_RADIUS_PX,
		font: opts.font ?? FONT_PRESETS[0].value
	};
}

export const PRESETS: Preset[] = [
	mk('performative', 'Performative', 'dark', {}),
	mk('daylight', 'Daylight', 'light', {}),
	mk(
		'monochrome',
		'Monochrome',
		'dark',
		{
			'pui-grad-from': '#52525b',
			'pui-grad-mid': '#a1a1aa',
			'pui-grad-to': '#f4f4f5'
		},
		{ radiusPx: 8 }
	),
	mk('sunset', 'Sunset', 'dark', {
		'pui-bg': '#0c0a09',
		'pui-bg-elev': '#1c1917',
		'pui-bg-soft': '#292524',
		'pui-border': '#44403c',
		'pui-border-bright': '#57534e',
		'pui-grad-from': '#f97316',
		'pui-grad-mid': '#ef4444',
		'pui-grad-to': '#ec4899'
	}),
	mk('oceanic', 'Oceanic', 'dark', {
		'pui-bg': '#08111a',
		'pui-bg-elev': '#0f1b2a',
		'pui-bg-soft': '#16283c',
		'pui-border': '#1e3a52',
		'pui-border-bright': '#2a4d6b',
		'pui-grad-from': '#06b6d4',
		'pui-grad-mid': '#3b82f6',
		'pui-grad-to': '#6366f1'
	}),
	mk('evergreen', 'Evergreen', 'dark', {
		'pui-bg': '#08120c',
		'pui-bg-elev': '#0f1d15',
		'pui-bg-soft': '#16291e',
		'pui-border': '#1f3d2c',
		'pui-border-bright': '#2c5740',
		'pui-grad-from': '#10b981',
		'pui-grad-mid': '#22c55e',
		'pui-grad-to': '#84cc16'
	}),
	mk(
		'neon-noir',
		'Neon Noir',
		'dark',
		{
			'pui-bg': '#050505',
			'pui-bg-elev': '#0d0d0d',
			'pui-bg-soft': '#151515',
			'pui-border': '#262626',
			'pui-border-bright': '#333333',
			'pui-grad-from': '#d946ef',
			'pui-grad-mid': '#ec4899',
			'pui-grad-to': '#22d3ee'
		},
		{ radiusPx: 6 }
	),
	mk('gold-rush', 'Gold Rush', 'dark', {
		'pui-bg': '#0c0a06',
		'pui-bg-elev': '#1a160d',
		'pui-bg-soft': '#262017',
		'pui-border': '#3d3424',
		'pui-border-bright': '#574a32',
		'pui-grad-from': '#f59e0b',
		'pui-grad-mid': '#fbbf24',
		'pui-grad-to': '#fde68a'
	}),
	mk('slate', 'Slate', 'dark', {
		'pui-bg': '#0b0f17',
		'pui-bg-elev': '#131a26',
		'pui-bg-soft': '#1c2636',
		'pui-border': '#2a3850',
		'pui-border-bright': '#3a4d6b',
		'pui-grad-from': '#64748b',
		'pui-grad-mid': '#94a3b8',
		'pui-grad-to': '#cbd5e1'
	}),
	mk(
		'grape-soda',
		'Grape Soda',
		'dark',
		{
			'pui-bg': '#0d0a1a',
			'pui-bg-elev': '#161229',
			'pui-bg-soft': '#201a3a',
			'pui-border': '#2f2755',
			'pui-border-bright': '#43386f',
			'pui-grad-from': '#8b5cf6',
			'pui-grad-mid': '#a855f7',
			'pui-grad-to': '#6366f1'
		},
		{ radiusPx: 18 }
	),
	mk(
		'rose',
		'Rosé',
		'light',
		{
			'pui-bg': '#fffafb',
			'pui-bg-elev': '#fdeef2',
			'pui-bg-soft': '#fbdfe8',
			'pui-border': '#f4c6d4',
			'pui-border-bright': '#eaa9bd',
			'pui-grad-from': '#f43f5e',
			'pui-grad-mid': '#ec4899',
			'pui-grad-to': '#d946ef'
		},
		{ radiusPx: 16 }
	),
	mk(
		'bubblegum',
		'Bubblegum',
		'light',
		{
			'pui-bg': '#fef6ff',
			'pui-bg-elev': '#faeefe',
			'pui-bg-soft': '#f3e0fb',
			'pui-border': '#ecd0f6',
			'pui-border-bright': '#dcb3ee',
			'pui-grad-from': '#ec4899',
			'pui-grad-mid': '#a855f7',
			'pui-grad-to': '#38bdf8'
		},
		{ radiusPx: 20 }
	),
	// Editorial, brand-flavoured presets (each ships a distinctive font).
	mk(
		'counsel',
		'Counsel',
		'light',
		{
			'pui-bg': '#ffffff',
			'pui-bg-elev': '#f7f8fa',
			'pui-bg-soft': '#eceef4',
			'pui-border': '#e2e5ee',
			'pui-border-bright': '#ccd1e0',
			'pui-fg': '#19214b',
			'pui-fg-dim': '#454c70',
			'pui-fg-mute': '#828aa8',
			'pui-grad-from': '#1e2a5e',
			'pui-grad-mid': '#3b5bd0',
			'pui-grad-to': '#6e8bff',
			'pui-success': '#1eb89c'
		},
		{ radiusPx: 6, font: fontStack('Newsreader') }
	),
	mk(
		'atelier',
		'Atelier',
		'light',
		{
			'pui-bg': '#faf6ee',
			'pui-bg-elev': '#f3ecdf',
			'pui-bg-soft': '#eae0cf',
			'pui-border': '#e0d4bf',
			'pui-border-bright': '#cdbd9f',
			'pui-fg': '#1a1813',
			'pui-fg-dim': '#5b5240',
			'pui-fg-mute': '#8a7f68',
			'pui-grad-from': '#cc785c',
			'pui-grad-mid': '#d8a07a',
			'pui-grad-to': '#b5835a',
			'pui-warn': '#cc785c'
		},
		{ radiusPx: 12, font: fontStack('Fraunces') }
	),
	mk(
		'vitals',
		'Vitals',
		'light',
		{
			'pui-bg': '#ffffff',
			'pui-bg-elev': '#eff8f6',
			'pui-bg-soft': '#e1f1ee',
			'pui-border': '#cde8e2',
			'pui-border-bright': '#a9d8ce',
			'pui-fg': '#0b2e2a',
			'pui-fg-dim': '#356159',
			'pui-fg-mute': '#6f9a92',
			'pui-grad-from': '#006298',
			'pui-grad-mid': '#00a3e0',
			'pui-grad-to': '#84bd00',
			'pui-success': '#84bd00'
		},
		{ radiusPx: 16, font: fontStack('Montserrat') }
	)
];

/** Round a px value to a rem string (e.g. 12 -> "0.75rem"). */
function rem(px: number): string {
	return `${Math.round((px / 16) * 1000) / 1000}rem`;
}

/**
 * Derive the four-step radius scale from a single base value, preserving the
 * original ratios (sm 0.667 · base 1 · lg 1.5 · xl 1.833).
 */
export function radiusScale(radiusPx: number): Record<string, string> {
	return {
		'pui-radius-sm': rem(radiusPx * 0.667),
		'pui-radius': rem(radiusPx),
		'pui-radius-lg': rem(radiusPx * 1.5),
		'pui-radius-xl': rem(radiusPx * 1.833)
	};
}

/** Flatten a theme state into `[--token, value]` pairs (colors + radii + font). */
export function themeEntries(state: ThemeState): [string, string][] {
	return [
		...ALL_TOKENS.map((t): [string, string] => [`--${t.key}`, state.colors[t.key]]),
		...Object.entries(radiusScale(state.radiusPx)).map(
			([k, v]): [string, string] => [`--${k}`, v]
		),
		['--pui-font-sans', state.font]
	];
}

/** A CSS gradient preview string for a preset's three stops. */
export function gradientPreview(colors: Record<string, string>): string {
	return `linear-gradient(120deg, ${colors['pui-grad-from']}, ${colors['pui-grad-mid']}, ${colors['pui-grad-to']})`;
}

/**
 * Resolve a preset's colors for a given base mode. The preset's accent (gradient
 * + semantic) always applies; its bespoke surfaces only apply in its own base,
 * otherwise the mode defaults are used so the dark/light toggle keeps working.
 */
export function resolvePresetColors(preset: Preset, base: Base): Record<string, string> {
	const surfaces = base === preset.base ? preset.surfaces : {};
	return { ...defaultsFor(base), ...surfaces, ...preset.accent };
}

/** Resolve a preset into a full theme state for the given base mode. */
export function resolvePreset(preset: Preset, base: Base): ThemeState {
	return {
		base,
		colors: resolvePresetColors(preset, base),
		radiusPx: preset.radiusPx,
		font: preset.font
	};
}

/** Serialise a theme state to a copy-pasteable CSS block. */
export function buildThemeCss(state: ThemeState): string {
	const selector = state.base === 'dark' ? ':root,\n[data-theme="dark"]' : '[data-theme="light"]';
	const lines: string[] = [];
	lines.push('/* Generated with the performative-ui theme generator */');
	lines.push(`${selector} {`);
	lines.push(`  color-scheme: ${state.base};`);
	for (const group of COLOR_GROUPS) {
		lines.push(`  /* ${group.title} */`);
		for (const t of group.tokens) lines.push(`  --${t.key}: ${state.colors[t.key]};`);
	}
	lines.push('  /* Corner radius */');
	for (const [k, v] of Object.entries(radiusScale(state.radiusPx))) lines.push(`  --${k}: ${v};`);
	lines.push('  /* Type */');
	lines.push(`  --pui-font-sans: ${state.font};`);
	lines.push('}');
	return lines.join('\n');
}
