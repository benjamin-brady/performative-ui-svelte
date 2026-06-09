<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import TokenStream from '$lib/components/TokenStream.svelte';
</script>

<Example
	title="Inside an AI bubble"
	code={`<ChatBubble role="ai" agent="Synthetica" thinking="reasoning…">
  <TokenStream
    text="Q3 churn is bleeding from your SMB cohort…"
    loop
  />
</ChatBubble>`}
>
	<ChatBubble role="ai" agent="Synthetica" thinking="reasoning…">
		<TokenStream
			text="Q3 churn is bleeding from your SMB cohort. Net retention there is 71% vs. 104% in mid-market and 118% in enterprise."
			loop
		/>
	</ChatBubble>
</Example>

<Example
	title="Per-character (custom tokenizer)"
	code={`<TokenStream
  text="reasoning, token by token by token…"
  tokenize={(s) => s.split("")}
  speedMs={45}
  loop
/>`}
>
	<div style="font-family:var(--pui-font-mono);font-size:14px">
		<TokenStream
			text="reasoning, token by token by token…"
			tokenize={(s) => s.split('')}
			speedMs={45}
			loop
		/>
	</div>
</Example>
