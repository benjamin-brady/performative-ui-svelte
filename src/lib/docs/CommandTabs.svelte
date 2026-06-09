<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	interface Tab {
		id: string;
		label: string;
	}

	let {
		tabs,
		active = $bindable(),
		code
	}: { tabs: Tab[]; active: string; code: string } = $props();
</script>

<div class="install-tabs">
	<div class="install-tabs__strip" role="tablist" aria-label="Package manager">
		{#each tabs as t (t.id)}
			<button
				type="button"
				role="tab"
				aria-selected={active === t.id}
				class="install-tab"
				class:install-tab--active={active === t.id}
				onclick={() => (active = t.id)}
			>
				{t.label}
			</button>
		{/each}
	</div>
	<CodeBlock {code} />
</div>
