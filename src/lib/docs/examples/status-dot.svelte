<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import StatusDot from '$lib/components/StatusDot.svelte';
</script>

<Example title="Default green" code={`<StatusDot /> All systems normal`}>
	<span style="display:inline-flex;gap:8px;align-items:center;font-size:14px">
		<StatusDot /> All systems normal
	</span>
</Example>

<Example title="Warn (custom color)" code={`<StatusDot color="#fbbf24" /> Degraded performance`}>
	<span style="display:inline-flex;gap:8px;align-items:center;font-size:14px">
		<StatusDot color="#fbbf24" /> Degraded performance
	</span>
</Example>
