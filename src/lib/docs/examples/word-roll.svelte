<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import WordRoll from '$lib/components/WordRoll.svelte';
</script>

<Example
title="Default (roll up)"
code={`<h2>
  AI for{" "}
  <WordRoll
    words={["doctors", "lawyers", "founders", "everyone"]}
    gradient
  />
</h2>`}
>
<h2 style="font-size:40px;margin:0;font-weight:700">
AI for <WordRoll words={['doctors', 'lawyers', 'founders', 'everyone']} gradient />
</h2>
</Example>

<Example
title="Roll down + slower"
code={`<WordRoll
  words={["builders", "founders", "tinkerers"]}
  direction="down"
  intervalMs={3000}
  transitionMs={700}
/>`}
>
<h2 style="font-size:32px;margin:0">
Built for <WordRoll
words={['builders', 'founders', 'tinkerers']}
direction="down"
intervalMs={3000}
transitionMs={700}
/>
</h2>
</Example>
