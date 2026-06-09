<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import FloatingSparkles from '$lib/components/FloatingSparkles.svelte';
</script>

<Example
title="Default"
stretch
code={`<div style={{ position: "relative", height: 240 }}>
  <FloatingSparkles />
</div>`}
>
<div style="position:relative;height:240px;overflow:hidden;background:#0a0a12">
<FloatingSparkles />
</div>
</Example>

<Example
title="Denser + emoji"
stretch
code={`<FloatingSparkles
  count={40}
  glyphs={["✨", "⭐", "💫"]}
  sizeRange={[10, 22]}
  durationS={[5, 12]}
/>`}
>
<div style="position:relative;height:220px;overflow:hidden;background:#0a0a12">
<FloatingSparkles count={40} glyphs={['✨', '⭐', '💫']} sizeRange={[10, 22]} durationS={[5, 12]} />
</div>
</Example>
