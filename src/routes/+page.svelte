<script lang="ts">
	import { base } from '$app/paths';
	import { COMPONENTS, CATEGORIES, REGISTRY_BASE_URL } from '$lib/docs/catalog';
	import StickyBanner from '$lib/components/StickyBanner.svelte';
	import EyebrowPill from '$lib/components/EyebrowPill.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
	import Rotator from '$lib/components/Rotator.svelte';
	import Aurora from '$lib/components/Aurora.svelte';
	import AsciiHero from '$lib/components/AsciiHero.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>performative-ui-svelte · AI-native Svelte components</title>
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
		class="home-hero__ascii"
	/>
	<div class="home-hero__content">
		<EyebrowPill>{COMPONENTS.length} components · MIT licensed</EyebrowPill>
		<h2 class="home-hero__title">
			<span class="home-hero__title-line">AI-native Svelte components for</span>
			<span class="home-hero__title-line home-hero__title-line--rotating">
				<GradientText>
					<Rotator words={['AI startups', 'frontier labs', 'the next ChatGPT', 'your moat']} />
				</GradientText>
			</span>
		</h2>
		<p class="lede">Components that signal how oversubscribed your funding round is.</p>
		<div class="home-install">bunx shadcn-svelte@latest add {REGISTRY_BASE_URL}/registry/button.json</div>
		<div class="home-cta-row">
			<Button as="a" href="{base}/demo" variant="glow" size="sm" sparkle>View live demo</Button>
			<a
				class="pui-btn pui-btn--ghost pui-btn--sm"
				href="https://github.com/benjamin-brady/performative-ui-svelte"
				target="_blank"
				rel="noreferrer"
			>
				★ Star on GitHub
			</a>
		</div>
		<p class="home-attribution">
			A Svelte port of
			<a
				class="home-attribution__link"
				href="https://github.com/vorpus/performativeUI"
				target="_blank"
				rel="noreferrer">performative-ui</a>, originally created by
			<a
				class="home-attribution__link"
				href="https://github.com/vorpus"
				target="_blank"
				rel="noreferrer">vorpus</a>.
		</p>
	</div>
</section>

{#each CATEGORIES as cat (cat)}
	{@const items = COMPONENTS.filter((c) => c.category === cat)}
	{#if items.length}
		<section>
			<h2 class="home-category-title">
				{cat}
			</h2>
			<div class="home-grid home-grid--category">
				{#each items as c (c.slug)}
					<a href="{base}/components/{c.slug}" class="home-card">
						<span class="home-card__cat">{c.category}</span>
						<span class="home-card__name">{c.name}</span>
						<span class="home-card__snark">{c.snark}</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
{/each}
