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
// Active preset id. Owned locally (not derived from `page.url`) because
// `replaceState` updates the address bar without reliably making
// `page.url` reactive — reading it here meant the apply effect never
// re-ran after the first switch. The URL is still seeded on load (below)
// and written on change purely for shareable links.
#presetId = $state('default');

constructor(initialBase: Base) {
this.#mode = new PersistedState<Base>('pui-theme', initialBase);
// A shared link's explicit ?mode / ?theme win over stored/default state.
if (browser) {
const params = new URLSearchParams(window.location.search);
const m = params.get('mode');
if (m === 'dark' || m === 'light') this.#mode.current = m;
const t = params.get('theme');
if (t) this.#presetId = t;
}
}

/** Mutate the URL search params without a navigation or history entry. */
#writeParams(next: { theme?: string; mode?: Base }) {
if (!browser) return;
// Build from the live location, not `page.url`, which can lag behind
// successive `replaceState` calls.
const url = new URL(window.location.href);
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
return this.#presetId;
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
this.#presetId = preset.id;
this.#writeParams({ theme: preset.id, mode: preset.base });
}

reset() {
this.#presetId = 'default';
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
