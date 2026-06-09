<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import LogoRow from '$lib/components/LogoRow.svelte';

	const ic = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
</script>

{#snippet sequoia()}
	<span style="font-family:var(--pui-font-serif);font-style:italic">Sequoia</span>
{/snippet}

{#snippet angels()}
	<span style="font-style:italic">…and 47 angels you've heard of</span>
{/snippet}

<Example
	title="Backed by"
	code={`<LogoRow
  heading="Backed by"
  logos={[
    { kind: "img",  src: ycSvgUrl, alt: "YC" },
    { kind: "node", node: "a16z" },
    { kind: "node", node: <em>Sequoia</em> },
  ]}
/>`}
>
	<LogoRow
		heading="Backed by"
		logos={[
			{ kind: 'img', src: ic('ycombinator'), alt: 'YC' },
			{ kind: 'node', node: 'a16z' },
			{ kind: 'node', node: sequoia },
			{ kind: 'node', node: 'FOUNDERS FUND' },
			{ kind: 'node', node: angels }
		]}
	/>
</Example>
