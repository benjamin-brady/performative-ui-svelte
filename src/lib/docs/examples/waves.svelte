<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import Waves from '$lib/components/Waves.svelte';
</script>

<Example
title="Default"
stretch
code={`<div style={{ position: "relative", height: 260 }}>
  <Waves />
</div>`}
>
<div style="position:relative;height:260px;overflow:hidden;background:var(--pui-bg)">
<Waves />
</div>
</Example>

<Example
title="About to break"
stretch
code={`<Waves
  lines={5}
  amplitude={104}
  skew={0.85}
  centerBias={0.8}
/>`}
>
<div style="position:relative;height:240px;overflow:hidden;background:var(--pui-bg)">
<Waves lines={5} amplitude={104} skew={0.85} centerBias={0.8} />
</div>
</Example>

<Example
title="Calm, upright swell"
stretch
code={`<Waves
  lines={4}
  complexity={2}
  skew={0.15}
  speed={0.1}
/>`}
>
<div style="position:relative;height:220px;overflow:hidden;background:var(--pui-bg)">
<Waves lines={4} complexity={2} skew={0.15} speed={0.1} />
</div>
</Example>
