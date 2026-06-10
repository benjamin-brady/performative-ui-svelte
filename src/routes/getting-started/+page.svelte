<script lang="ts">
	import { base } from '$app/paths';
	import { PersistedState } from 'runed';
	import CodeBlock from '$lib/docs/CodeBlock.svelte';
	import CommandTabs from '$lib/docs/CommandTabs.svelte';

	type ManagerId = 'npm' | 'pnpm' | 'bun' | 'yarn';

	interface Manager {
		id: ManagerId;
		label: string;
		/** Run a package binary without installing (npx-equivalent). */
		exec: string;
		/** Install dependencies. */
		install: string;
		/** Run a package.json script (suffix the script name). */
		run: string;
	}

	const managers: Manager[] = [
		{ id: 'npm', label: 'npm', exec: 'npx', install: 'npm install', run: 'npm run' },
		{ id: 'pnpm', label: 'pnpm', exec: 'pnpm dlx', install: 'pnpm install', run: 'pnpm' },
		{ id: 'bun', label: 'bun', exec: 'bunx', install: 'bun install', run: 'bun' },
		{ id: 'yarn', label: 'yarn', exec: 'yarn dlx', install: 'yarn install', run: 'yarn' }
	];

	const selected = new PersistedState<ManagerId>('pui-pkg-manager', 'npm');
	const pm = $derived(managers.find((m) => m.id === selected.current) ?? managers[0]);
	const tabs = managers.map((m) => ({ id: m.id, label: m.label }));

	// `shadcn-svelte add` needs an absolute URL it can fetch, not a site-relative
	// path. Use the published registry origin (matches the README) so the commands
	// are copy-pasteable from anywhere, including the local dev preview.
	const registryBase = 'https://benjamin-brady.github.io/performative-ui-svelte/registry';

	const createProject = $derived(`# Scaffold a fresh SvelteKit app (Svelte 5)
${pm.exec} sv create my-app

# Pick: SvelteKit minimal · TypeScript · Tailwind CSS
cd my-app
${pm.install}`);

	const initProject = $derived(`# Create components.json (point the global CSS prompt at src/app.css)
${pm.exec} shadcn-svelte@latest init`);

	const addComponents = $derived(`# Pull owned-code components from the registry
${pm.exec} shadcn-svelte@latest add ${registryBase}/button.json
${pm.exec} shadcn-svelte@latest add ${registryBase}/gradient-text.json
${pm.exec} shadcn-svelte@latest add ${registryBase}/sparkle.json`);

	const demoPage = `<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import GradientText from "$lib/components/GradientText.svelte";
	import Sparkle from "$lib/components/Sparkle.svelte";
<\/script>

<main style="display:grid;place-items:center;min-height:100vh;gap:1.5rem;text-align:center">
	<h1 style="font-size:2.5rem;font-weight:700">
		Ship <GradientText>agentic workflows</GradientText> <Sparkle />
	</h1>

	<Button variant="glow" sparkle>Generate</Button>
</main>`;

	const runDev = $derived(
		selected.current === 'npm' ? 'npm run dev -- --open' : `${pm.run} dev --open`
	);
</script>

<svelte:head>
	<title>Getting Started · performative-ui-svelte</title>
</svelte:head>

<article>
	<header class="cp-header">
		<div class="cp-eyebrow"><span>Guide</span></div>
		<h1 class="cp-title">Getting Started</h1>
		<p class="cp-snark">From <code>npm create</code> to an oversubscribed-looking demo in five minutes.</p>
	</header>

	<section class="cp-section">
		<p class="cp-description">
			This guide spins up a fresh SvelteKit project, adds a couple of
			performative-ui-svelte components, and wires up a tiny demo page. Components
			are installed as owned source via the shadcn-svelte registry, so your app
			keeps the Tailwind build, theme tokens, and the component files themselves.
		</p>
		<p class="cp-description gs-note">
			Requirements: Node 18+, Svelte 5, and Tailwind CSS v4. Pick your package
			manager in any command block below — they all stay in sync.
		</p>
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">1 · Create a SvelteKit project</h2>
		<p class="cp-install-copy">
			Use the official <code>sv</code> CLI. When prompted, choose the
			<strong>SvelteKit minimal</strong> template, <strong>TypeScript</strong>, and add the
			<strong>Tailwind CSS</strong> plugin — that wires up Tailwind v4 for you.
		</p>
		<CommandTabs {tabs} bind:active={selected.current} code={createProject} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">2 · Initialize shadcn-svelte</h2>
		<p class="cp-install-copy">
			Create a <code>components.json</code> so the registry knows where to drop
			files. When prompted for your global stylesheet, point it at
			<code>src/app.css</code> (the Tailwind entry imported from
			<code>src/routes/+layout.svelte</code>) — the next step overwrites that file
			with the performative theme tokens and the shared animation keyframes.
		</p>
		<CommandTabs {tabs} bind:active={selected.current} code={initProject} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">3 · Add a few components</h2>
		<p class="cp-install-copy">
			Pull just what the demo needs. Each command drops an owned-code component
			into <code>src/lib/components/</code> and brings its theme + utils along on
			first run. Swap the slug for any entry in the
			<a href="{base}/registry/index.json">registry</a>.
		</p>
		<CommandTabs {tabs} bind:active={selected.current} code={addComponents} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">4 · Build a demo page</h2>
		<p class="cp-install-copy">
			Keep it deliberately small — three components is plenty to look like you
			raised a Series B. Drop this into <code>src/routes/+page.svelte</code>:
		</p>
		<CodeBlock code={demoPage} />
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">5 · Run it</h2>
		<p class="cp-install-copy">Start the dev server and open the demo:</p>
		<CommandTabs {tabs} bind:active={selected.current} code={runDev} />
		<p class="cp-description gs-next">
			That's the whole loop. Browse the sidebar for the other
			components and copy them in the same way.
		</p>
	</section>
</article>
