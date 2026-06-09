<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import PromptHero from '$lib/components/PromptHero.svelte';
</script>

<Example title="Default" code={`<PromptHero onSubmit={(text) => navigate(\`/build?q=\${text}\`)} />`}>
	<div style="width:100%;max-width:540px">
		<PromptHero onSubmit={(t) => alert(`Building: ${t}`)} />
	</div>
</Example>

<Example
	title="Custom CTA + placeholder"
	code={`<PromptHero
  placeholder="Paste a tweet, get a landing page…"
  ctaLabel="Ship it"
/>`}
>
	<div style="width:100%;max-width:540px">
		<PromptHero placeholder="Paste a tweet, get a landing page…" ctaLabel="Ship it" />
	</div>
</Example>
