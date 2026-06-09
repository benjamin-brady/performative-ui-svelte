<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	let { url }: { url: string } = $props();

	const managers = [
		{ id: 'pnpm', label: 'pnpm', runner: 'pnpm dlx' },
		{ id: 'npm', label: 'npm', runner: 'npx' },
		{ id: 'yarn', label: 'yarn', runner: 'npx' },
		{ id: 'bun', label: 'bun', runner: 'bun x' }
	] as const;

	let active = $state<(typeof managers)[number]['id']>('pnpm');

	const runner = $derived(managers.find((m) => m.id === active)?.runner ?? 'pnpm dlx');
	const code = $derived(`${runner} shadcn-svelte@latest add ${url}`);
</script>

<div class="install-tabs">
	<div class="install-tabs__strip" role="tablist" aria-label="Package manager">
		{#each managers as m (m.id)}
			<button
				type="button"
				role="tab"
				aria-selected={active === m.id}
				class="install-tab"
				class:install-tab--active={active === m.id}
				onclick={() => (active = m.id)}
			>
				{m.label}
			</button>
		{/each}
	</div>
	<CodeBlock {code} />
</div>
