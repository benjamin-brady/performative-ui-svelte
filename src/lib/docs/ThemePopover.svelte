<script lang="ts">
	import { PRESETS, gradientPreview } from './theme-presets';
	import { siteThemeContext } from './theme.svelte';

	const theme = siteThemeContext.get();
	let open = $state(false);

	let copied = $state(false);
	async function copyCss() {
		try {
			await navigator.clipboard.writeText(theme.css);
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
					class={'tpop__item' + (theme.presetId === 'default' ? ' tpop__item--active' : '')}
					aria-pressed={theme.presetId === 'default'}
					onclick={() => theme.reset()}
				>
					<span class="tpop__swatch tpop__swatch--default"></span>
					<span class="tpop__name">Default</span>
				</button>
				{#each PRESETS as preset (preset.id)}
					<button
						type="button"
						class={'tpop__item' + (theme.presetId === preset.id ? ' tpop__item--active' : '')}
						aria-pressed={theme.presetId === preset.id}
						onclick={() => theme.apply(preset)}
					>
						<span class="tpop__swatch" style={`background: ${gradientPreview(preset.colors)};`}
						></span>
						<span class="tpop__name">{preset.name}</span>
					</button>
				{/each}
			</div>
			<p class="tpop__hint">Re-skins the site and respects your dark/light toggle.</p>
		</div>
	{/if}
</div>
