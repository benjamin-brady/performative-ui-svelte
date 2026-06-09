<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import ChatFAB from '$lib/components/ChatFAB.svelte';
	import ChatFABHeader from '$lib/components/ChatFABHeader.svelte';
	import ChatFABBody from '$lib/components/ChatFABBody.svelte';
</script>

<Example
	title="Default (click to open)"
	code={`<ChatFAB
  popover={<>
    <ChatFAB.Header>Hi, I'm Synthi.</ChatFAB.Header>
    <ChatFAB.Body>Ask me anything.</ChatFAB.Body>
  </>}
/>`}
>
	<div style="position:relative;min-height:200px;width:100%">
		<p style="text-align:center;color:var(--pui-fg-mute)">
			The FAB is fixed-positioned to the viewport, so it's docked bottom-right of your window, not this card.
		</p>
		<ChatFAB>
			{#snippet popover()}
				<ChatFABHeader>Hi, I'm Synthi.</ChatFABHeader>
				<ChatFABBody>
					<p style="margin:0;color:var(--pui-fg-dim)">Ask me anything about Synthetica.</p>
				</ChatFABBody>
			{/snippet}
		</ChatFAB>
	</div>
</Example>
