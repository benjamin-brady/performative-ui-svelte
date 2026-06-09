<script lang="ts">
	let { code }: { code: string } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			/* clipboard blocked, fail silently */
		}
	}
</script>

<div class="example__code">
	<button class="code-copy" onclick={copy} type="button">{copied ? 'copied' : 'copy'}</button>
	<pre class="code-block">{code.trim()}</pre>
</div>
