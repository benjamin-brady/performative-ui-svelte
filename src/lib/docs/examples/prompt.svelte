<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
</script>

<Example
	title="Default"
	stretch
	code={`<Prompt
  onSubmit={(text, { model }) => generate(text, model)}
/>`}
>
	<div style="padding:24px;display:flex;justify-content:center">
		<Prompt onSubmit={(text: string, ctx: { model?: string }) => alert(`Building with ${ctx.model}:\n${text}`)} />
	</div>
</Example>

<Example
	title="Custom models + voice/context wired up"
	stretch
	code={`<Prompt
  placeholder="Paste a tweet, get a landing page…"
  models={["o4-mini", "Claude Sonnet 4.6", "Llama 4 70B"]}
  defaultModel="Claude Sonnet 4.6"
  onAddContext={openFilePicker}
  onVoice={startVoiceMode}
  onSubmit={(text) => generate(text)}
/>`}
>
	<div style="padding:24px;display:flex;justify-content:center">
		<Prompt
			placeholder="Paste a tweet, get a landing page…"
			models={['o4-mini', 'Claude Sonnet 4.6', 'Llama 4 70B']}
			defaultModel="Claude Sonnet 4.6"
			onAddContext={() => alert('File picker opens here')}
			onVoice={() => alert('Voice mode')}
			onSubmit={(text: string) => alert('Ship it: ' + text)}
		/>
	</div>
</Example>
