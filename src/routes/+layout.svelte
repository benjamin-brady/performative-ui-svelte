<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { COMPONENTS, CATEGORIES, ORDERED_COMPONENTS } from '$lib/docs/catalog';
	import ThemePopover from '$lib/docs/ThemePopover.svelte';
	import { SiteTheme, siteThemeContext } from '$lib/docs/theme.svelte';
	import '$lib/styles/pui.css';
	import '../app.css';
	import './docs.css';

	let { children } = $props();

	// Static top-of-sidebar guide links, separate from the component catalog.
	const GUIDE = [
		{ name: 'Getting Started', href: `${base}/getting-started` },
		{ name: 'Theming', href: `${base}/getting-started/theming` }
	];

	type Theme = 'dark' | 'light';

	function detectInitialTheme(): Theme {
		if (!browser) return 'dark';
		return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	}

	const theme = siteThemeContext.set(new SiteTheme(detectInitialTheme()));
	let menuOpen = $state(false);

	let pathname = $derived(page.url.pathname);

	// Apply the dark/light base to <html>.
	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme.base);
	});

	// Apply (or clear) the active preset's inline tokens on <html>.
	$effect(() => {
		theme.applyToDocument();
	});

	// Scroll to top + close mobile menu on route change.
	$effect(() => {
		pathname;
		window.scrollTo(0, 0);
		menuOpen = false;
	});

	// Skim navigation: `]` next, `[` prev (sidebar order). Skipped in inputs.
	$effect(() => {
		const onKey = (e: KeyboardEvent) => {
			const t = e.target;
			if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const idx = ORDERED_COMPONENTS.findIndex((c) => `${base}/components/${c.slug}` === pathname);
			const prev = idx > 0 ? ORDERED_COMPONENTS[idx - 1] : null;
			const next =
				idx >= 0 && idx < ORDERED_COMPONENTS.length - 1 ? ORDERED_COMPONENTS[idx + 1] : null;
			if (e.key === ']' && next) {
				e.preventDefault();
				goto(`${base}/components/${next.slug}`);
			} else if (e.key === '[' && prev) {
				e.preventDefault();
				goto(`${base}/components/${prev.slug}`);
			}
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	});
</script>

<div class={'docs' + (menuOpen ? ' docs--menu-open' : '')}>
	<button
		class="docs__menu-btn"
		aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
		aria-expanded={menuOpen}
		onclick={() => (menuOpen = !menuOpen)}
	>
		{menuOpen ? '✕' : '☰'}
	</button>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="docs__backdrop" aria-hidden="true" onclick={() => (menuOpen = false)}></div>

	<aside class="sidebar">
		<div class="sidebar__brand-row">
			<a href={base || '/'} class="sidebar__brand">
				<span class="sidebar__mark">◣</span>
				<span>performative-ui-svelte</span>
			</a>
			<div class="sidebar__actions">
				<ThemePopover />
				<button
					type="button"
					class="sidebar__theme-toggle"
					onclick={() => theme.toggleBase()}
					aria-label={`Switch to ${theme.base === 'dark' ? 'light' : 'dark'} mode`}
					title={`Switch to ${theme.base === 'dark' ? 'light' : 'dark'} mode`}
				>
					{#if theme.base === 'dark'}
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
						</svg>
					{:else}
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<div class="sidebar__section">
			<p class="sidebar__title">Guide</p>
			<nav class="sidebar__nav">
				{#each GUIDE as item (item.href)}
					<a
						href={item.href}
						class={'sidebar__link' + (pathname === item.href ? ' sidebar__link--active' : '')}
					>
						{item.name}
					</a>
				{/each}
			</nav>
		</div>

		{#each CATEGORIES as cat (cat)}
			<div class="sidebar__section">
				<p class="sidebar__title">{cat}</p>
				<nav class="sidebar__nav">
					{#each COMPONENTS.filter((c) => c.category === cat) as c (c.slug)}
						<a
							href="{base}/components/{c.slug}"
							class={'sidebar__link' +
								(pathname === `${base}/components/${c.slug}` ? ' sidebar__link--active' : '')}
						>
							{c.name}
						</a>
					{/each}
				</nav>
			</div>
		{/each}

		<div class="sidebar__attribution">
			Svelte port of
			<a
				class="sidebar__attribution-link"
				href="https://github.com/vorpus/performativeUI"
				target="_blank"
				rel="noreferrer">performative-ui</a>
			by
			<a
				class="sidebar__attribution-link"
				href="https://github.com/vorpus"
				target="_blank"
				rel="noreferrer">vorpus</a>.
		</div>
	</aside>

	<main class="docs__main">
		{@render children?.()}
	</main>
</div>
