<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import CommunityBadge from '$lib/components/CommunityBadge.svelte';

	const ic = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
</script>

<Example
	title="Trio"
	code={`<CommunityBadge
  href="https://github.com/…"
  icon={githubSvgUrl}
  title="Star us on GitHub"
  subtitle={<><b>12,847</b> stars · +184 this week</>}
/>`}
>
	<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;width:100%">
		<CommunityBadge href="#" icon={ic('github')} title="Star us on GitHub">
			{#snippet subtitle()}<strong>12,847</strong> stars · +184 this week{/snippet}
		</CommunityBadge>
		<CommunityBadge
			href="#"
			icon={ic('discord')}
			title="Join the Discord"
			subtitle="8,201 online now"
		/>
		<CommunityBadge href="#" icon={ic('x')} title="Follow on X" subtitle="build in public, always" />
	</div>
</Example>
