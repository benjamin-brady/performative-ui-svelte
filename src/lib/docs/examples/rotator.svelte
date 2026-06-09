<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import Rotator from '$lib/components/Rotator.svelte';
	import GradientText from '$lib/components/GradientText.svelte';
</script>

<Example
	title="Basic"
	code={`<h1>
  AI for{' '}
  <GradientText>
    <Rotator words={["doctors", "lawyers", "founders", "everyone"]} />
  </GradientText>
</h1>`}
>
	<h1 style="font-size:44px;margin:0;font-weight:700">
		AI for <GradientText><Rotator words={['doctors', 'lawyers', 'founders', 'everyone']} /></GradientText>
	</h1>
</Example>

<Example
	title="Faster + no cursor"
	code={`<Rotator
  words={["context-switching", "writing emails", "shipping slop"]}
  typeMs={50}
  holdMs={1000}
  hideCursor
/>`}
>
	<h2 style="font-size:32px;margin:0;font-weight:700">
		Stop <Rotator
			words={['context-switching', 'writing emails', 'shipping slop']}
			typeMs={50}
			holdMs={1000}
			hideCursor
		/>.
	</h2>
</Example>

<Example
	title="Custom word renderer"
	code={`<Rotator
  words={["builders", "thinkers", "doers"]}
  renderWord={(w) => <span style={{ borderBottom: "2px solid #ec4899" }}>{w}</span>}
/>`}
>
	<h2 style="font-size:28px;margin:0">
		Built for <Rotator words={['builders', 'thinkers', 'doers']}>
			{#snippet renderWord(w)}<span style="border-bottom:2px solid #ec4899">{w}</span>{/snippet}
		</Rotator>
	</h2>
</Example>
