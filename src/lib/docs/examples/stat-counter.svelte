<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
	import StatCounter from '$lib/components/StatCounter.svelte';
</script>

<Example title="Builders count" code={`<StatCounter target={8247} />`}>
	<h2 style="font-size:40px;margin:0">
		Join <GradientText><StatCounter target={8247} /></GradientText> builders.
	</h2>
</Example>

<Example
	title="Currency"
	code={`<StatCounter target={42_500_000} format={(n) => \`$\${n.toLocaleString()}\`} />`}
>
	<h2 style="font-size:40px;margin:0">
		<StatCounter target={42_500_000} format={(n) => '$' + n.toLocaleString()} />
	</h2>
</Example>
