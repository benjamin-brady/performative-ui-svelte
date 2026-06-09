<script lang="ts">
	import { base } from '$app/paths';
	import CodeBlock from '$lib/docs/CodeBlock.svelte';

	const installExample = `# Components are owned code — copy them in from the registry.
pnpm dlx shadcn-svelte@latest add \\
  https://benjamin-brady.github.io/performative-ui-svelte/registry/button.json`;

	const usageExample = `<script>
  import { Button, GradientText, Sparkle } from 'performative-ui-svelte';
<\/script>

<h1>
  Ship <GradientText>agentic workflows</GradientText> <Sparkle />
</h1>
<Button variant="glow" sparkle>Deploy</Button>`;

	const steps = [
		{
			title: 'Install the styles',
			body: 'Import the package stylesheet once (after Tailwind) so the --pui-* tokens and utility mappings are available everywhere.'
		},
		{
			title: 'Add components from the registry',
			body: 'Each component is owned code you copy into your app via shadcn-svelte, so you can edit it freely — nothing is locked inside a dependency.'
		},
		{
			title: 'Make it yours',
			body: 'Re-skin the whole system by redefining a handful of CSS variables — or use the live Theme Generator on the Theming page.'
		}
	];
</script>

<svelte:head>
	<title>Getting Started · performative-ui-svelte</title>
</svelte:head>

<article>
	<header class="cp-header">
		<div class="cp-eyebrow"><span>Guide</span></div>
		<h1 class="cp-title">Getting Started</h1>
		<p class="cp-snark">AI-native Svelte components for products that need to look oversubscribed.</p>
	</header>

	<section class="cp-section">
		<p class="cp-description">
			performative-ui-svelte is a set of opinionated, owned-code components — heroes, gradients,
			glass cards, chat surfaces and more — built on Svelte 5 and Tailwind v4. Everything is
			painted from a single layer of <code>--pui-*</code> CSS variables, so the whole library
			re-skins from a few tokens.
		</p>
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Add a component</h2>
		<p class="cp-description">
			Components are distributed as owned code through the registry. Pull one in and it lands in
			your project, yours to edit.
		</p>
		<CodeBlock code={installExample} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Use it</h2>
		<p class="cp-description">Import and compose — the tokens do the rest.</p>
		<CodeBlock code={usageExample} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Three steps to shipped</h2>
		<ol class="gs-steps">
			{#each steps as step, i (step.title)}
				<li class="gs-step">
					<span class="gs-step__num">{i + 1}</span>
					<div>
						<h3 class="gs-step__title">{step.title}</h3>
						<p class="gs-step__body">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Next</h2>
		<p class="cp-description">
			Head to <a class="gs-link" href="{base}/getting-started/theming">Theming</a> to learn the token
			system and tweak a live theme with the generator — then browse the component catalog in the
			sidebar.
		</p>
	</section>
</article>
