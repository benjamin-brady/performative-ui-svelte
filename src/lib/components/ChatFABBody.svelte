<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ChatFABBodyProps extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let { class: className, children, ...rest }: ChatFABBodyProps = $props();
</script>

<div data-slot="chat-fab-body" class={cn('p-4', className)} {...rest}>{@render children?.()}</div>
