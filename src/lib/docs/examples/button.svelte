<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<Example
	title="All five variants"
	code={`<Button variant="glow" sparkle>Generate</Button>
<Button variant="shimmer">Start building</Button>
<Button variant="ghost">Talk to sales</Button>
<Button variant="solid">Upgrade</Button>
<Button variant="wave">Request a demo</Button>`}
>
	<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
		<Button variant="glow" sparkle>Generate</Button>
		<Button variant="shimmer">Start building</Button>
		<Button variant="ghost">Talk to sales</Button>
		<Button variant="solid">Upgrade</Button>
		<Button variant="wave">Request a demo</Button>
	</div>
</Example>

<Example
	title="Sizes"
	code={`<Button size="sm">Small</Button>
<Button>Medium</Button>
<Button size="lg">Large</Button>`}
>
	<div style="display:flex;gap:12px;align-items:center">
		<Button size="sm" variant="ghost">Small</Button>
		<Button variant="ghost">Medium</Button>
		<Button size="lg" variant="ghost">Large</Button>
	</div>
</Example>

<Example title="Loading" code={`<Button variant="glow" loading>Shipping…</Button>`}>
	<Button variant="glow" loading>Shipping…</Button>
</Example>

<Example title="As an anchor" code={`<Button as="a" href="/docs" variant="ghost">Read the docs</Button>`}>
	<Button as="a" href="#" variant="ghost">Read the docs</Button>
</Example>
