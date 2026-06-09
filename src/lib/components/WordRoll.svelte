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
data-slot="word-roll"
class={cn('relative inline-block [clip-path:inset(0)]', className)}
style={mergedStyle}
{...rest}
>
<span data-slot="word-roll-sizer" class="pointer-events-none inline-block whitespace-nowrap invisible" aria-hidden="true">{words[i]}</span>
{#each words as w, idx (idx)}
<span
class={cn(
'absolute left-0 top-0 inline-block whitespace-nowrap opacity-0 transition-[transform,opacity] duration-[var(--pui-roll-ms,500ms)] ease-pui',
gradient && 'bg-[linear-gradient(120deg,var(--pui-grad-from),var(--pui-grad-mid),var(--pui-grad-to))] bg-[length:200%_200%] bg-clip-text text-transparent animate-[pui-grad-shift_8s_ease_infinite]',
idx === i && 'translate-y-0 opacity-100',
idx !== i && idx !== prev && (direction === 'down' ? '-translate-y-full' : 'translate-y-full'),
idx === prev && i !== prev && (direction === 'down' ? 'translate-y-full' : '-translate-y-full')
)}
aria-hidden={idx === i ? undefined : 'true'}
>
{w}
</span>
{/each}
</span>
