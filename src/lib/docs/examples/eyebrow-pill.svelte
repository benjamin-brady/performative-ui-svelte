<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import EyebrowPill from '$lib/components/EyebrowPill.svelte';
	import Sparkle from '$lib/components/Sparkle.svelte';
</script>

<Example title="Default" code={`<EyebrowPill>Now with GPT-5.5 Turbo Vision Pro</EyebrowPill>`}>
	<EyebrowPill>Now with GPT-5.5 Turbo Vision Pro</EyebrowPill>
</Example>

<Example title="Custom icon" code={`<EyebrowPill icon={<Sparkle />}>The platform</EyebrowPill>`}>
	<EyebrowPill>
		{#snippet icon()}<Sparkle />{/snippet}
		The platform
	</EyebrowPill>
</Example>
