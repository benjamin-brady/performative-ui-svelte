<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface MockIDEChromeProps extends HTMLAttributes<HTMLDivElement> {
		filename?: string;
		thinking?: string | Snippet | false;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { filename, thinking, class: className, children, ...rest }: MockIDEChromeProps = $props();
</script>

<div class={cn('pui-ide__chrome', className)} {...rest}>
	<span class="pui-ide__dot pui-ide__dot--red"></span>
	<span class="pui-ide__dot pui-ide__dot--yellow"></span>
	<span class="pui-ide__dot pui-ide__dot--green"></span>
	{#if filename}<span class="pui-ide__tab">{filename}</span>{/if}
	{@render children?.()}
	{#if thinking !== false}
		<span class="pui-ide__thinking">
			<span class="pui-spinner"></span>
			<span>{#if typeof thinking === 'string'}{thinking}{:else}{@render thinking?.()}{/if}</span>
		</span>
	{/if}
</div>
