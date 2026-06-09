<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import GlassCard from '$lib/components/GlassCard.svelte';
	import GlassCardIcon from '$lib/components/GlassCardIcon.svelte';
	import GlassCardTitle from '$lib/components/GlassCardTitle.svelte';
	import GlassCardBody from '$lib/components/GlassCardBody.svelte';
	import GlassCardLink from '$lib/components/GlassCardLink.svelte';
</script>

<Example
	title="Default with all parts"
	code={`<GlassCard breathing>
  <GlassCard.Icon>✦</GlassCard.Icon>
  <GlassCard.Title>Reason</GlassCard.Title>
  <GlassCard.Body>A frontier-class reasoning engine.</GlassCard.Body>
  <GlassCard.Link href="/learn">Learn more</GlassCard.Link>
</GlassCard>`}
>
	<div style="width:320px">
		<GlassCard breathing>
			<GlassCardIcon>✦</GlassCardIcon>
			<GlassCardTitle>Reason</GlassCardTitle>
			<GlassCardBody>
				A frontier-class reasoning engine. Multi-step. Multi-modal. Multi-vendor.
			</GlassCardBody>
			<GlassCardLink href="#">Learn more</GlassCardLink>
		</GlassCard>
	</div>
</Example>
