<script lang="ts">
	import CodeBlock from '$lib/docs/CodeBlock.svelte';
	import ThemeGenerator from '$lib/docs/ThemeGenerator.svelte';

	const tokenGroups = [
		{
			title: 'Surfaces',
			rows: [
				['--pui-bg', 'Page background'],
				['--pui-bg-elev', 'Cards, popovers, elevated panels'],
				['--pui-bg-soft', 'Inset / muted fills'],
				['--pui-border', 'Default border color'],
				['--pui-border-bright', 'Emphasised borders, inputs']
			]
		},
		{
			title: 'Text',
			rows: [
				['--pui-fg', 'Primary text'],
				['--pui-fg-dim', 'Secondary text'],
				['--pui-fg-mute', 'Tertiary / placeholder text']
			]
		},
		{
			title: 'Gradient',
			rows: [
				['--pui-grad-from', 'First stop of the signature gradient'],
				['--pui-grad-mid', 'Middle stop'],
				['--pui-grad-to', 'Final stop'],
				['--pui-grad', 'Composed linear-gradient() built from the three stops']
			]
		},
		{
			title: 'Semantic',
			rows: [
				['--pui-success', 'Success states, healthy status dots'],
				['--pui-danger', 'Errors, destructive actions'],
				['--pui-warn', 'Warnings, degraded status']
			]
		},
		{
			title: 'Shape & type',
			rows: [
				['--pui-radius-sm / --pui-radius / --pui-radius-lg / --pui-radius-xl', 'Corner radius scale'],
				['--pui-font-sans', 'UI font stack'],
				['--pui-font-mono', 'Code / eyebrow font stack'],
				['--pui-font-serif', 'Editorial / snark font stack'],
				['--pui-glow / --pui-glow-strong', 'Neon glow shadows']
			]
		}
	];

	const overrideExample = `@import "tailwindcss";
@source "../node_modules/performative-ui-svelte/dist";
@import "performative-ui-svelte/styles.css";

/* Override any token you like — everything cascades from here. */
:root,
[data-theme="dark"] {
  --pui-grad-from: #06b6d4;
  --pui-grad-mid: #3b82f6;
  --pui-grad-to: #8b5cf6;
  --pui-radius: 1rem;
}`;

	const themeAttrExample = `<!-- Toggle the whole palette with one attribute on <html>. -->
<html data-theme="dark"> … </html>
<html data-theme="light"> … </html>`;
</script>

<svelte:head>
	<title>Theming · performative-ui-svelte</title>
</svelte:head>

<article>
	<header class="cp-header">
		<div class="cp-eyebrow"><span>Getting Started</span></div>
		<h1 class="cp-title">Theming</h1>
		<p class="cp-snark">One layer of CSS variables between you and a billion-dollar look.</p>
	</header>

	<section class="cp-section">
		<p class="cp-description">
			Every performative-ui component is painted from a single set of CSS custom properties,
			all prefixed <code>--pui-*</code>. There are no hard-coded colors inside the components,
			so re-theming is just a matter of redefining a few variables. Tailwind v4 maps these
			tokens to utility classes via <code>@theme inline</code>, so your overrides flow through
			to both the components and your own markup.
		</p>
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Dark &amp; light</h2>
		<p class="cp-description">
			The palette is keyed off a <code>data-theme</code> attribute. Dark is the default
			(<code>:root</code>); light is applied when <code>[data-theme="light"]</code> is present.
			Set the attribute on <code>&lt;html&gt;</code> and every component flips at once.
		</p>
		<CodeBlock code={themeAttrExample} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Token reference</h2>
		<p class="cp-description">
			The tokens you'll reach for most often. Each is a plain custom property — override it
			anywhere in the cascade.
		</p>
		{#each tokenGroups as group (group.title)}
			<div class="cp-subprops">
				<div class="cp-subprops__title">{group.title}</div>
				<table class="props">
					<thead>
						<tr><th>Token</th><th>Purpose</th></tr>
					</thead>
					<tbody>
						{#each group.rows as [token, purpose] (token)}
							<tr><td>{token}</td><td>{purpose}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Overriding tokens</h2>
		<p class="cp-description">
			Redefine any token after importing the package styles. Because the gradient is composed
			from <code>--pui-grad-from/mid/to</code>, changing the three stops re-skins every gradient,
			glow, and button in one move.
		</p>
		<CodeBlock code={overrideExample} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Theme generator</h2>
		<p class="cp-description">
			Tweak the tokens below and watch real components react in the live preview. When it looks
			right, copy the generated CSS straight into your <code>app.css</code>.
		</p>
		<ThemeGenerator />
	</section>
</article>
