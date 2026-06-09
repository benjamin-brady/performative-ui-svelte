<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';
import type { UseAsciiFieldOptions } from '$lib/hooks/useAsciiField.svelte';

export interface AsciiHeroProps extends HTMLAttributes<HTMLDivElement>, UseAsciiFieldOptions {
/**
 * Visual treatment:
 *   - "panel" (default): bordered card with backdrop. Use as a hero.
 *   - "bare": no chrome. Use as a background layer (`position: absolute; inset: 0`).
 */
variant?: 'panel' | 'bare';
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';
import { useAsciiField } from '$lib/hooks/useAsciiField.svelte';

let {
variant = 'panel',
cols,
rows,
fontSize,
fontFamily,
charRamp,
colorful,
palette,
baseOpacity,
reactive,
rippleStrength,
rippleRadius,
spotlightOpacity,
spotlightRadius,
frameMs,
class: className,
...rest
}: AsciiHeroProps = $props();

let hostEl: HTMLDivElement | null = $state(null);
let canvasEl: HTMLCanvasElement | null = $state(null);

const hostRef = { get current() { return hostEl; } };
const canvasRef = { get current() { return canvasEl; } };

useAsciiField(canvasRef, hostRef, {
get cols() { return cols; },
get rows() { return rows; },
get fontSize() { return fontSize; },
get fontFamily() { return fontFamily; },
get charRamp() { return charRamp; },
get colorful() { return colorful; },
get palette() { return palette; },
get baseOpacity() { return baseOpacity; },
get reactive() { return reactive; },
get rippleStrength() { return rippleStrength; },
get rippleRadius() { return rippleRadius; },
get spotlightOpacity() { return spotlightOpacity; },
get spotlightRadius() { return spotlightRadius; },
get frameMs() { return frameMs; }
});
</script>

<div
bind:this={hostEl}
class={cn('pui-ascii', variant === 'panel' && 'pui-ascii--panel', className)}
aria-hidden="true"
{...rest}
>
<canvas bind:this={canvasEl}></canvas>
</div>
