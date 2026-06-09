<script lang="ts">
	import type { PropSpec } from './catalog';
	let { props }: { props: PropSpec[] } = $props();
</script>

{#if props.length}
	<table class="props">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each props as p (p.name)}
				<tr>
					<td>{p.name}{#if p.required}<span class="req">*</span>{/if}</td>
					<td>{p.type}</td>
					<td>{p.default ?? '-'}</td>
					<td>{p.desc}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
