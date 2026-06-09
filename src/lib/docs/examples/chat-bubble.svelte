<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
</script>

<Example
	title="User + AI"
	code={`<ChatBubble role="user">Summarize Q3 churn…</ChatBubble>
<ChatBubble role="ai" agent="Synthetica" thinking="reasoning…">
  Q3 churn is bleeding from your SMB cohort…
</ChatBubble>`}
>
	<div style="display:flex;flex-direction:column;gap:12px;width:100%">
		<ChatBubble role="user">Summarize Q3 churn by cohort and tell me what's bleeding.</ChatBubble>
		<ChatBubble role="ai" agent="Synthetica" thinking="reasoning…">
			Q3 churn is bleeding from your SMB cohort. Net retention is 71% vs. 104% in mid-market.
		</ChatBubble>
	</div>
</Example>
