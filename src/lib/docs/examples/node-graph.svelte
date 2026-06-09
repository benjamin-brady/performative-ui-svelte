<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import NodeGraphBackground from '$lib/components/NodeGraphBackground.svelte';
</script>

<Example
title="Default"
stretch
code={`<div style={{ position: "relative", height: 280 }}>
  <NodeGraphBackground />
</div>`}
>
<div style="position:relative;height:280px;overflow:hidden;background:#08080b">
<NodeGraphBackground />
</div>
</Example>

<Example
title="Sparse + green"
stretch
code={`<NodeGraphBackground
  density={35}
  linkColor="#22c55e"
  colors={["#86efac", "#22c55e"]}
  linkDistance={180}
/>`}
>
<div style="position:relative;height:240px;overflow:hidden;background:#08080b">
<NodeGraphBackground
density={35}
linkColor="#22c55e"
colors={['#86efac', '#22c55e']}
linkDistance={180}
/>
</div>
</Example>
