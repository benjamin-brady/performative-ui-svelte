<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import AsciiHero from '$lib/components/AsciiHero.svelte';
</script>

<Example title="Default panel" stretch code={`<AsciiHero />`}>
<div style="padding:24px">
<AsciiHero />
</div>
</Example>

<Example title="Colorful (aurora palette)" stretch code={`<AsciiHero colorful />`}>
<div style="padding:24px">
<AsciiHero colorful />
</div>
</Example>

<Example
title="As a hero background (low opacity + cursor spotlight)"
stretch
code={`<div style={{ position: "relative" }}>
  <AsciiHero
    variant="bare"
    colorful
    baseOpacity={0.18}
    spotlightOpacity={0.9}
    spotlightRadius={10}
    style={{ position: "absolute", inset: 0 }}
  />
  <div style={{ position: "relative", zIndex: 1 }}>…content…</div>
</div>`}
>
<div style="position:relative;min-height:280px;padding:36px;overflow:hidden;background:#08080b">
<AsciiHero
variant="bare"
colorful
baseOpacity={0.18}
spotlightOpacity={0.9}
spotlightRadius={10}
style="position:absolute;inset:0"
/>
<div style="position:relative;z-index:1;text-align:center;color:var(--pui-fg)">
<h3 style="font-size:28px;margin:0 0 8px">Hover this card.</h3>
<p style="margin:0;color:var(--pui-fg-dim)">
The field stays dim until your cursor lights it up.
</p>
</div>
</div>
</Example>

<Example
title="Custom palette + ramp"
stretch
code={`<AsciiHero
  palette={["#22c55e", "#86efac", "#fbbf24"]}
  charRamp=" .:-=+*#%@"
/>`}
>
<div style="padding:24px">
<AsciiHero palette={['#22c55e', '#86efac', '#fbbf24']} charRamp=" .:-=+*#%@" />
</div>
</Example>
