<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import LogoMarquee from '$lib/components/LogoMarquee.svelte';

	const ic = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
</script>

{#snippet nasa()}
	<span class="pui-marquee__text">NASA</span>
{/snippet}

{#snippet harvard()}
	<span class="pui-marquee__text pui-marquee__text--serif">Harvard</span>
{/snippet}

<Example
	title="Real + text logos"
	stretch
	code={`<LogoMarquee
  logos={[
    { kind: "img",  src: openaiSvgUrl, alt: "OpenAI" },
    { kind: "img",  src: stripeSvgUrl, alt: "Stripe" },
    { kind: "node", node: <span className="pui-marquee__text">NASA</span> },
    // …
  ]}
  speed={30}
/>`}
>
	<LogoMarquee
		logos={[
			{ kind: 'img', src: ic('openai'), alt: 'OpenAI' },
			{ kind: 'img', src: ic('stripe'), alt: 'Stripe' },
			{ kind: 'img', src: ic('anthropic'), alt: 'Anthropic' },
			{ kind: 'node', node: nasa },
			{ kind: 'img', src: ic('notion'), alt: 'Notion' },
			{ kind: 'img', src: ic('shopify'), alt: 'Shopify' },
			{ kind: 'node', node: harvard },
			{ kind: 'img', src: ic('vercel'), alt: 'Vercel' },
			{ kind: 'img', src: ic('github'), alt: 'GitHub' },
			{ kind: 'img', src: ic('nvidia'), alt: 'NVIDIA' }
		]}
		speed={30}
	/>
</Example>
