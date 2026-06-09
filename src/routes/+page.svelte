<script lang="ts">
	import { COMPONENTS, CATEGORIES } from '$lib/docs/catalog';
	import StickyBanner from '$lib/components/StickyBanner.svelte';
	import EyebrowPill from '$lib/components/EyebrowPill.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
	import Rotator from '$lib/components/Rotator.svelte';
	import Aurora from '$lib/components/Aurora.svelte';
	import AsciiHero from '$lib/components/AsciiHero.svelte';
</script>

<svelte:head>
	<title>performative-ui · AI-native Svelte components</title>
</svelte:head>

<StickyBanner>Now generally available</StickyBanner>

<section class="home-hero" data-theme="dark">
	<Aurora />
	<AsciiHero
		variant="bare"
		colorful
		baseOpacity={0.18}
		spotlightOpacity={0.9}
		spotlightRadius={10}
		fontSize={11}
		style="position:absolute;inset:0;z-index:1"
	/>
	<div style="position:relative;z-index:3">
		<EyebrowPill>{COMPONENTS.length} components · MIT licensed</EyebrowPill>
		<h2 style="margin-top:16px">
			<span style="display:block">AI-native Svelte components for</span>
			<span style="display:block;min-height:1.1em;max-width:100%;overflow-wrap:break-word">
				<GradientText>
					<Rotator words={['AI startups', 'frontier labs', 'the next ChatGPT', 'your moat']} />
				</GradientText>
			</span>
		</h2>
		<p class="lede">Components that signal how oversubscribed your funding round is.</p>
		<div class="home-install">npm install performative-ui-svelte</div>
		<div class="home-cta-row">
			<a
				class="pui-btn pui-btn--ghost pui-btn--sm"
				href="https://github.com/vorpus/performativeUI"
				target="_blank"
				rel="noreferrer"
			>
				★ Star on GitHub
			</a>
		</div>
	</div>
</section>

{#each CATEGORIES as cat (cat)}
	{@const items = COMPONENTS.filter((c) => c.category === cat)}
	{#if items.length}
		<section>
			<h2
				style="font-family:var(--pui-font-mono);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--pui-fg-mute);padding:20px 56px 0;margin:0"
			>
				{cat}
			</h2>
			<div class="home-grid" style="padding-top:20px;padding-bottom:32px">
				{#each items as c (c.slug)}
					<a href="/components/{c.slug}" class="home-card">
						<span class="home-card__cat">{c.category}</span>
						<span class="home-card__name">{c.name}</span>
						<span class="home-card__snark">{c.snark}</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
{/each}
