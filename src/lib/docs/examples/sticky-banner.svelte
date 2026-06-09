<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import StickyBanner from '$lib/components/StickyBanner.svelte';
</script>

<Example
	title="Funding bar"
	stretch
	code={`<StickyBanner trailing="→">
  Backed by Y Combinator (W26), we just raised our seed
</StickyBanner>`}
>
	<StickyBanner>
		{#snippet trailing()}<span class="pui-arrow">→</span>{/snippet}
		Backed by Y Combinator (W26), we just raised our seed
	</StickyBanner>
</Example>
