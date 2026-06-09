<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
</script>

<Example title="Inline emphasis" code={`<h2>Built for <GradientText>velocity</GradientText>.</h2>`}>
	<h2 style="font-size:36px;margin:0">Built for <GradientText>velocity</GradientText>.</h2>
</Example>

<Example title="As an h1" code={`<GradientText as="h1">Infinite possibility</GradientText>`}>
	<GradientText as="h1" style="font-size:48px;margin:0">Infinite possibility</GradientText>
</Example>
