<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';

export interface FloatingSparklesProps extends HTMLAttributes<HTMLDivElement> {
/** How many sparkles to render. */
count?: number;
/** Pool of glyphs to pick from. */
glyphs?: string[];
/** [min, max] seconds for the float-up duration. */
durationS?: [number, number];
/** [min, max] px font size. */
sizeRange?: [number, number];
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let {
count = 18,
glyphs = ['✦', '✧', '✶', '✺', '✹', '·'],
durationS = [8, 18],
sizeRange = [8, 20],
class: className,
...rest
}: FloatingSparklesProps = $props();

let items = $derived.by(() =>
Array.from({ length: count }, () => ({
glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
left: Math.random() * 100,
duration: durationS[0] + Math.random() * (durationS[1] - durationS[0]),
delay: Math.random() * durationS[1],
size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
opacity: 0.4 + Math.random() * 0.5
}))
);
</script>

<div data-slot="floating-sparkles" aria-hidden="true" class={cn('pointer-events-none absolute inset-0 z-[2] overflow-hidden', className)} {...rest}>
{#each items as it, i (i)}
<span
data-slot="floating-sparkle"
class="absolute bottom-[-12px] animate-[pui-float-up_linear_infinite] text-white/70 [animation-fill-mode:backwards] [font-size:var(--pui-sparkle-size)] [left:var(--pui-sparkle-left)] [text-shadow:0_0_8px_oklch(0.656_0.242_354.3/0.6)]"
style="--pui-sparkle-left:{it.left}%;--pui-sparkle-size:{it.size}px;--pui-sparkle-peak:{it.opacity.toFixed(2)};animation-duration:{it.duration}s;animation-delay:{it.delay}s"
>
{it.glyph}
</span>
{/each}
</div>
