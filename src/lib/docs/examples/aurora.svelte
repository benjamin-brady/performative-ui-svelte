<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import Aurora from '$lib/components/Aurora.svelte';
</script>

<Example
title="Default purple/pink/cyan"
stretch
code={`<div style={{ position: "relative" }}>
  <Aurora />
  <div style={{ position: "relative", zIndex: 1 }}>…</div>
</div>`}
>
<div style="position:relative;height:280px;overflow:hidden;isolation:isolate">
<Aurora />
<div style="position:relative;z-index:1;padding:36px;text-align:center">
<h2 style="margin:0;font-size:32px">Aurora as a hero backdrop</h2>
</div>
</div>
</Example>

<Example
title="Lava-lamp animated (blobs push each other around)"
stretch
code={`<Aurora
  animated
  blobs={[
    { color: "rgba(124,58,237,0.55)", x: 30, y: 40, size: 55 },
    { color: "rgba(236,72,153,0.45)", x: 65, y: 35, size: 50 },
    { color: "rgba(6,182,212,0.40)",  x: 55, y: 75, size: 50 },
    { color: "rgba(251,191,36,0.30)", x: 25, y: 70, size: 40 },
  ]}
/>`}
>
<div style="position:relative;height:280px;overflow:hidden;isolation:isolate">
<Aurora
	animated
	blobs={[
		{ color: 'rgba(124,58,237,0.55)', x: 30, y: 40, size: 55 },
		{ color: 'rgba(236,72,153,0.45)', x: 65, y: 35, size: 50 },
		{ color: 'rgba(6,182,212,0.40)', x: 55, y: 75, size: 50 },
		{ color: 'rgba(251,191,36,0.30)', x: 25, y: 70, size: 40 }
	]}
/>
</div>
</Example>

<Example
title="Custom palette"
stretch
code={`<Aurora blobs={[
  { color: "rgba(34,197,94,0.45)", x: 25, y: 30, size: 55 },
  { color: "rgba(251,191,36,0.4)",  x: 75, y: 60, size: 45 },
]} />`}
>
<div style="position:relative;height:220px;overflow:hidden">
<Aurora
	blobs={[
		{ color: 'rgba(34,197,94,0.45)', x: 25, y: 30, size: 55 },
		{ color: 'rgba(251,191,36,0.4)', x: 75, y: 60, size: 45 }
	]}
/>
</div>
</Example>
