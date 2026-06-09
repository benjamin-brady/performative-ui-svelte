<script lang="ts">
	import type { Component } from 'svelte';
	import { base } from '$app/paths';
	import type { ComponentMeta } from './catalog';
	import { ORDERED_COMPONENTS } from './catalog';
	import PropsTable from './PropsTable.svelte';

	let { meta, examples }: { meta: ComponentMeta; examples?: Component } = $props();

	const Examples = $derived(examples);
	let next = $derived.by(() => {
		const idx = ORDERED_COMPONENTS.findIndex((c) => c.slug === meta.slug);
		return idx >= 0 && idx < ORDERED_COMPONENTS.length - 1 ? ORDERED_COMPONENTS[idx + 1] : null;
	});
</script>

<article>
	<header class="cp-header">
		<div class="cp-eyebrow"><span>{meta.category}</span></div>
		<h1 class="cp-title">{meta.name}</h1>
		<p class="cp-snark">{meta.snark}</p>
	</header>

	<section class="cp-section">
		<p class="cp-description">{meta.description}</p>
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Examples</h2>
		{#if Examples}
			<Examples />
		{/if}
	</section>

	<section class="cp-section">
		<h2 class="cp-section__title">Props</h2>
		<PropsTable props={meta.props} />
		{#each meta.subprops ?? [] as sp (sp.name)}
			<div style="margin-top:24px">
				<div
					style="font-family:var(--pui-font-mono);font-size:13px;margin-bottom:8px;color:var(--pui-fg)"
				>
					{sp.name}
				</div>
				<PropsTable props={sp.props} />
			</div>
		{/each}
	</section>

	{#if next}
		<a href="{base}/components/{next.slug}" class="cp-skim-next">
			<span class="cp-skim-next__label">Next</span>
			<span class="cp-skim-next__name">{next.name}</span>
			<span class="cp-skim-next__hint"><kbd>]</kbd></span>
			<span class="cp-skim-next__arrow">→</span>
		</a>
	{/if}
</article>
