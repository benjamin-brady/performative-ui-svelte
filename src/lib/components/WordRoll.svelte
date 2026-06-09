<script lang="ts" module>
import type { HTMLAttributes } from 'svelte/elements';

export interface WordRollProps extends HTMLAttributes<HTMLSpanElement> {
/** Words to cycle through. */
words: string[];
/** ms each word holds before rolling out. Default 2200. */
intervalMs?: number;
/** ms of the slide animation. Default 500. */
transitionMs?: number;
/** Direction the active word rolls in from. */
direction?: 'up' | 'down';
/** Paint each word with the AI gradient. */
gradient?: boolean;
}
</script>

<script lang="ts">
import { cn } from '$lib/utils/cn';

let {
words,
intervalMs = 2200,
transitionMs = 500,
direction = 'up',
gradient,
class: className,
style,
...rest
}: WordRollProps = $props();

let i = $state(0);
let prev = $derived((i - 1 + words.length) % words.length);
let mergedStyle = $derived(`${style ? style + ';' : ''}--pui-roll-ms:${transitionMs}ms`);

$effect(() => {
if (!words.length) return;
const t = setInterval(() => {
i = (i + 1) % words.length;
}, intervalMs);
return () => clearInterval(t);
});
</script>

<span
class={cn('pui-roll', direction === 'down' && 'pui-roll--down', gradient && 'pui-roll--gradient', className)}
style={mergedStyle}
{...rest}
>
<span class="pui-roll__sizer" aria-hidden="true">{words[i]}</span>
{#each words as w, idx (idx)}
<span
class={cn(
'pui-roll__word',
idx === i && 'pui-roll__word--active',
idx === prev && i !== prev && 'pui-roll__word--past'
)}
aria-hidden={idx === i ? undefined : 'true'}
>
{w}
</span>
{/each}
</span>
