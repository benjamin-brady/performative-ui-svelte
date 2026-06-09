/**
 * Site-wide theme controller.
 *
 * Shared between the layout (which owns the dark/light toggle and applies the
 * tokens to <html>) and the nav theme popover via a runed `Context`. The active
 * preset and base mode live in the URL search params (`?theme=…&mode=…`) so a
 * themed view is shareable by copying the link. Reads come from SvelteKit's
 * reactive `page` state; writes use shallow `replaceState` so we never spam the
 * history stack or trigger a navigation.
 */
import { browser } from '$app/environment';
import { page } from '$app/state';
import { replaceState } from '$app/navigation';
import { Context, PersistedState } from 'runed';
import {
PRESETS,
FONT_PRESETS,
DEFAULT_RADIUS_PX,
defaultsFor,
themeEntries,
resolvePreset,
buildThemeCss,
type Base,
type Preset,
type ThemeState
} from './theme-presets';

/** Every custom-property name we ever set, for clean removal on reset. */
export const PROP_NAMES = themeEntries({
base: 'dark',
colors: defaultsFor('dark'),
radiusPx: DEFAULT_RADIUS_PX,
font: FONT_PRESETS[0].value
}).map(([k]) => k);

export class SiteTheme {
#mode: PersistedState<Base>;

constructor(initialBase: Base) {
this.#mode = new PersistedState<Base>('pui-theme', initialBase);
// An explicit ?mode in a shared link wins over the visitor's stored choice.
if (browser) {
const m = new URLSearchParams(window.location.search).get('mode');
if (m === 'dark' || m === 'light') this.#mode.current = m;
}
}

/** Mutate the URL search params without a navigation or history entry. */
#writeParams(next: { theme?: string; mode?: Base }) {
if (!browser) return;
const url = new URL(page.url);
if (next.theme !== undefined) {
if (next.theme === 'default') url.searchParams.delete('theme');
else url.searchParams.set('theme', next.theme);
}
if (next.mode !== undefined) url.searchParams.set('mode', next.mode);
replaceState(url, page.state);
}

get base(): Base {
return this.#mode.current;
}
set base(v: Base) {
this.#mode.current = v;
this.#writeParams({ mode: v });
}

get presetId(): string {
// Reactive: tracks `page.url` so getters re-run on shallow URL changes.
const fromUrl = browser ? page.url.searchParams.get('theme') : null;
return fromUrl ?? 'default';
}

get activePreset(): Preset | null {
return PRESETS.find((p) => p.id === this.presetId) ?? null;
}

/** Resolved tokens for the current preset + base (or stock defaults). */
get state(): ThemeState {
const preset = this.activePreset;
return preset
? resolvePreset(preset, this.base)
: {
base: this.base,
colors: defaultsFor(this.base),
radiusPx: DEFAULT_RADIUS_PX,
font: FONT_PRESETS[0].value
};
}

get css(): string {
return buildThemeCss(this.state);
}

apply(preset: Preset) {
this.#mode.current = preset.base;
this.#writeParams({ theme: preset.id, mode: preset.base });
}

reset() {
this.#writeParams({ theme: 'default' });
}

toggleBase() {
this.base = this.base === 'dark' ? 'light' : 'dark';
}

/** Apply (or clear) the active preset's inline tokens on <html>. */
applyToDocument() {
if (!browser) return;
const el = document.documentElement;
if (this.activePreset) {
for (const [k, v] of themeEntries(this.state)) el.style.setProperty(k, v);
} else {
for (const k of PROP_NAMES) el.style.removeProperty(k);
}
}
}

export const siteThemeContext = new Context<SiteTheme>('pui-site-theme');
