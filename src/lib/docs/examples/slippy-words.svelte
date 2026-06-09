<script lang="ts">
	import Example from '$lib/docs/Example.svelte';
	import SlippyWords from '$lib/components/SlippyWords.svelte';
</script>

<Example
	title="Scroll the page to see them slide"
	stretch
	code={`<SlippyWords
  rows={[
    ["agentic", "multimodal", "RAG-native", "zero-shot", "fine-tuned"],
    ["SOC 2", "HIPAA", "on-prem", "GDPR-ready", "enterprise"],
    ["10x faster", "human-in-the-loop", "self-healing", "real-time"],
  ]}
/>`}
>
	<SlippyWords
		rows={[
			['agentic', 'multimodal', 'RAG-native', 'zero-shot', 'fine-tuned', 'frontier-grade', 'context-aware'],
			['SOC 2', 'HIPAA', 'on-prem', 'GDPR-ready', 'sub-100ms', 'infinitely scalable', 'enterprise'],
			['10x faster', 'human-in-the-loop', 'self-healing', 'observable', 'vector-first', 'real-time']
		]}
	/>
</Example>

<Example
	title="Gradient fill + stronger travel"
	stretch
	code={`<SlippyWords
  gradient
  intensity={360}
  startDirection="right"
  rows={[
    ["ship", "scale", "synergize", "disrupt", "iterate", "pivot"],
    ["velocity", "alignment", "north star", "moat", "flywheel"],
  ]}
/>`}
>
	<SlippyWords
		gradient
		intensity={360}
		startDirection="right"
		rows={[
			['ship', 'scale', 'synergize', 'disrupt', 'iterate', 'pivot', '10x'],
			['velocity', 'alignment', 'north star', 'moat', 'flywheel', 'tailwinds']
		]}
	/>
</Example>

<Example
	title="Per-badge gradient highlight"
	stretch
	code={`<SlippyWords
  rows={[
    ["GPT-class", { label: "now with reasoning", gradient: true }, "open weights"],
    ["BYO model", "edge inference", { label: "$0 to start", gradient: true }],
  ]}
/>`}
>
	<SlippyWords
		rows={[
			['GPT-class', { label: 'now with reasoning', gradient: true }, 'open weights', 'MoE', '128k context'],
			['BYO model', 'edge inference', { label: '$0 to start', gradient: true }, 'usage-based', 'no lock-in']
		]}
	/>
</Example>
