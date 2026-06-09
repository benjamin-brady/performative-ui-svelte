<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import Sparkle from '$lib/components/Sparkle.svelte';
</script>

<Example title="Default" code={`<Sparkle />`}>
	<span style="font-size:32px">Generate <Sparkle /></span>
</Example>

<Example title="Solid (no gradient)" code={`<Sparkle solid />`}>
	<span style="font-size:32px;color:#fbbf24"><Sparkle solid /> Pro</span>
</Example>

<Example title="Custom glyph" code={`<Sparkle glyph="❖" />`}>
	<span style="font-size:32px"><Sparkle glyph="❖" /> Magic</span>
</Example>
