<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import Waves from '$lib/components/Waves.svelte';
</script>

<Example
title="Default"
stretch
code={`<div style={{ position: "relative", height: 220 }}>
  <Waves />
</div>`}
>
<div style="position:relative;height:220px;overflow:hidden;background:#fafaf5">
<Waves />
</div>
</Example>

<Example
title="Calmer swell"
stretch
code={`<Waves
  lines={4}
  amplitude={28}
  speed={0.6}
  complexity={3}
/>`}
>
<div style="position:relative;height:200px;overflow:hidden;background:#fafaf5">
<Waves lines={4} amplitude={28} speed={0.6} complexity={3} />
</div>
</Example>

<Example
title="Choppy + cyan"
stretch
code={`<Waves
  lines={9}
  amplitude={54}
  complexity={6}
  colors={["#67e8f9", "#22d3ee", "#0ea5e9", "#a5f3fc"]}
/>`}
>
<div style="position:relative;height:240px;overflow:hidden;background:#05080d">
<Waves
lines={9}
amplitude={54}
complexity={6}
colors={['#67e8f9', '#22d3ee', '#0ea5e9', '#a5f3fc']}
/>
</div>
</Example>
