<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import BeforeAfter from '$lib/components/BeforeAfter.svelte';
</script>

<Example
title="Quick form"
stretch
code={`<BeforeAfter
  brand="Synthetica"
  before={[
    "14 tabs open",
    "3 hours of meetings about meetings",
    "Vibes-based prioritization",
  ]}
  after={[
    "One pane of glass",
    "Async by default",
    "Outcome-driven",
  ]}
/>`}
>
<div style="padding:24px">
<BeforeAfter
brand="Synthetica"
before={[
'14 tabs open',
'3 hours of meetings about meetings',
'Vibes-based prioritization'
]}
after={['One pane of glass', 'Async by default', 'Outcome-driven']}
/>
</div>
</Example>
