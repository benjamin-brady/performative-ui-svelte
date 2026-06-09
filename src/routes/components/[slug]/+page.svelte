<script lang="ts">
	import type { Component } from 'svelte';
	import ComponentPage from '$lib/docs/ComponentPage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Registry of per-component demo files, keyed by slug.
	const modules = import.meta.glob('$lib/docs/examples/*.svelte', { eager: true }) as Record<
		string,
		{ default: Component }
	>;
	const registry: Record<string, Component> = {};
	for (const [path, mod] of Object.entries(modules)) {
		const slug = path.split('/').pop()!.replace('.svelte', '');
		registry[slug] = mod.default;
	}

	let examples = $derived(registry[data.meta.slug]);
</script>

<svelte:head>
	<title>{data.meta.name} · performative-ui</title>
</svelte:head>

<ComponentPage meta={data.meta} {examples} />
