<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IdeToken } from './MockIDE.svelte';

	export interface MockIDEBodyProps extends HTMLAttributes<HTMLPreElement> {
		tokens: IdeToken[];
		loop?: boolean;
		charMs?: [number, number];
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { tokens, loop = true, charMs = [14, 42], class: className, ...rest }: MockIDEBodyProps = $props();

	let preRef: HTMLPreElement | undefined = $state();
	let tick = $state(0);

	$effect(() => {
		tick;
		const el = preRef;
		if (!el || !tokens.length) return;
		let cancelled = false;
		let timer: ReturnType<typeof setTimeout> | null = null;
		let tokenIdx = 0;
		let charIdx = 0;

		const caret = '<span data-slot="mock-ide-caret" class="inline-block h-3.5 w-2 animate-[pui-caret_1s_steps(2,start)_infinite] bg-pui-grad-mid align-[-2px] shadow-[0_0_8px_var(--pui-grad-mid)]"></span>';
		const escape = (s: string) =>
			s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		const run = () => {
			if (cancelled) return;
			if (tokenIdx >= tokens.length) {
				if (loop) {
					timer = setTimeout(() => {
						tokenIdx = 0;
						charIdx = 0;
						el.innerHTML = caret;
						tick += 1;
						run();
					}, 3000);
				}
				return;
			}
			const tok = tokens[tokenIdx];
			charIdx += 1;
			if (charIdx > tok.c.length) {
				tokenIdx += 1;
				charIdx = 0;
				run();
				return;
			}
			let html = '';
			for (let k = 0; k < tokenIdx; k++) {
				const t = tokens[k];
				html += t.cls ? `<span data-token="${t.cls}">${escape(t.c)}</span>` : escape(t.c);
			}
			const partial = tok.c.slice(0, charIdx);
			html += tok.cls ? `<span data-token="${tok.cls}">${escape(partial)}</span>` : escape(partial);
			html += caret;
			el.innerHTML = html;
			const [lo, hi] = charMs;
			const ms = lo + Math.random() * (hi - lo) + (partial.endsWith('\n') ? 120 : 0);
			timer = setTimeout(run, ms);
		};
		el.innerHTML = caret;
		run();
		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	});
</script>

<pre bind:this={preRef} data-slot="mock-ide-body" class={cn('m-0 min-h-[280px] whitespace-pre-wrap px-[26px] py-[22px] font-mono text-[13px] leading-[1.65] text-[#d5d5e0] [&_[data-token=com]]:italic [&_[data-token=com]]:text-[#6b7280] [&_[data-token=fn]]:text-[#60a5fa] [&_[data-token=key]]:text-[#c084fc] [&_[data-token=num]]:text-[#fbbf24] [&_[data-token=str]]:text-[#6ee7b7]', className)} {...rest}></pre>
