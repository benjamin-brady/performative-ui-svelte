/**
 * The component catalog — plain data powering the docs sidebar, headers,
 * and props tables. Demos live as Svelte components in `./examples/<slug>.svelte`.
 * Ported from the React docs `meta.tsx` (data only; no JSX).
 */

export interface PropSpec {
	name: string;
	type: string;
	default?: string;
	required?: boolean;
	desc: string;
}

export interface Source {
	name: string;
	url: string;
}

export interface ComponentMeta {
	slug: string;
	category: string;
	name: string;
	snark: string;
	sources: Source[];
	extra?: number;
	description: string;
	props: PropSpec[];
	/** Sub-components for compound components (e.g. PricingCard.Tier). */
	subprops?: Array<{ name: string; props: PropSpec[] }>;
}

export const CATEGORIES = [
	'Atoms',
	'Primitives',
	'Banners',
	'Heroes',
	'Backgrounds',
	'Surfaces',
	'Conversation',
	'Social Proof',
	'Pricing & Conversion'
] as const;

export const COMPONENTS: ComponentMeta[] = [
	{
		slug: 'sparkle',
		category: 'Atoms',
		name: 'Sparkle',
		snark: 'Add ✦ to any noun to ship it twice as fast.',
		sources: [
			{ name: 'v0.app', url: 'https://v0.app' },
			{ name: 'lovable.dev', url: 'https://lovable.dev' },
			{ name: 'notion.com/product/ai', url: 'https://www.notion.com/product/ai' }
		],
		extra: 412,
		description:
			'The mandatory four-pointed star. Defaults to a twinkling gradient glyph. Pass `solid` for a monochrome variant; pass `static` to stop the twinkle.',
		props: [
			{ name: 'glyph', type: 'string', default: '"✦"', desc: 'The character to render.' },
			{ name: 'solid', type: 'boolean', desc: 'Skip gradient; render in currentColor.' },
			{ name: 'static', type: 'boolean', desc: 'Disable the twinkle animation.' }
		]
	},
	{
		slug: 'gradient-text',
		category: 'Atoms',
		name: 'GradientText',
		snark: 'When italic isn\'t billion-dollar enough.',
		sources: [
			{ name: 'linear.app', url: 'https://linear.app' },
			{ name: 'mistral.ai', url: 'https://mistral.ai' },
			{ name: 'vercel.com', url: 'https://vercel.com' }
		],
		extra: 280,
		description:
			'Text painted with the consensus AI gradient. Use `as` to wrap any element. Set `static` to keep it gradient-colored but stop the shift animation.',
		props: [
			{ name: 'as', type: 'string', default: '\'span\'', desc: 'Tag to render.' },
			{ name: 'static', type: 'boolean', desc: 'Disable the gradient shift animation.' }
		]
	},
	{
		slug: 'status-dot',
		category: 'Atoms',
		name: 'StatusDot',
		snark: 'Always green, even when it\'s not.',
		sources: [
			{ name: 'vercel.com', url: 'https://vercel.com' },
			{ name: 'cursor.com', url: 'https://cursor.com' },
			{ name: 'linear.app', url: 'https://linear.app' }
		],
		extra: 600,
		description:
			'A pulsing colored dot, the universal \'we\'re live\' indicator. Drop into pills, navs, statuses.',
		props: [
			{ name: 'color', type: 'string', default: 'var(--pui-success)', desc: 'CSS color.' },
			{ name: 'static', type: 'boolean', desc: 'Disable the pulse.' }
		]
	},
	{
		slug: 'button',
		category: 'Primitives',
		name: 'Button',
		snark: 'We made the button move so you\'d click the button.',
		sources: [
			{ name: 'v0.app', url: 'https://v0.app' },
			{ name: 'lovable.dev', url: 'https://lovable.dev' },
			{ name: 'anthropic.com', url: 'https://www.anthropic.com' }
		],
		extra: 1200,
		description:
			'Polymorphic button with five variants: glow (pulsing gradient halo), shimmer (animated highlight sweep), ghost (outlined), solid (gradient fill), and wave (pill with an animated rainbow wrapping its bottom border, the MUI \'Edit in Chat\' treatment). Pass `as` to render an `<a>` or routed link.',
		props: [
			{
				name: 'variant',
				type: '"glow" | "shimmer" | "ghost" | "solid" | "wave"',
				default: '"glow"',
				desc: 'Visual style.'
			},
			{ name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', desc: 'Padding + font.' },
			{ name: 'sparkle', type: 'boolean', desc: 'Append a ✦ after the label.' },
			{ name: 'loading', type: 'boolean', desc: 'Show spinner + disable.' },
			{ name: 'block', type: 'boolean', desc: 'Render full-width.' },
			{ name: 'as', type: 'string', default: '"button"', desc: 'Polymorphic tag.' }
		]
	},
	{
		slug: 'sticky-banner',
		category: 'Banners',
		name: 'StickyBanner',
		snark: 'Funding news disguised as utility.',
		sources: [
			{ name: 'granola.ai', url: 'https://www.granola.ai' },
			{ name: 'vercel.com', url: 'https://vercel.com' },
			{ name: 'linear.app', url: 'https://linear.app' }
		],
		extra: 300,
		description:
			'The sticky top announcement bar. Houses Series A news, beta tags, and \'now in W26\' brags. Renders full-width above the nav.',
		props: [
			{ name: 'hideSparkle', type: 'boolean', desc: 'Drop the leading ✦.' },
			{ name: 'trailing', type: 'Snippet', desc: 'Trailing accessory (arrow, etc.).' }
		]
	},
	{
		slug: 'eyebrow-pill',
		category: 'Primitives',
		name: 'EyebrowPill',
		snark: 'Where the model name goes when there\'s nothing else to say.',
		sources: [
			{ name: 'mistral.ai', url: 'https://mistral.ai' },
			{ name: 'openai.com', url: 'https://openai.com' },
			{ name: 'cohere.com', url: 'https://cohere.com' }
		],
		extra: 500,
		description:
			'The pill that sits above the H1 of every section. Defaults to a pulsing green status dot. Pass `icon={false}` to hide, or any node to replace.',
		props: [
			{ name: 'icon', type: 'Snippet | false', default: 'StatusDot snippet', desc: 'Leading icon. False to hide.' },
			{ name: 'statusColor', type: 'string', desc: 'Color of the default dot.' }
		]
	},
	{
		slug: 'rotator',
		category: 'Heroes',
		name: 'Rotator',
		snark: 'Because saying "everything" wasn\'t ambitious enough.',
		sources: [
			{ name: 'vapi.ai', url: 'https://vapi.ai' },
			{ name: 'cresta.com', url: 'https://www.cresta.com' },
			{ name: 'bland.ai', url: 'https://bland.ai' },
			{ name: 'fal.ai', url: 'https://fal.ai' }
		],
		extra: 30,
		description:
			'Types each word, holds, deletes, advances, repeats, the canonical AI-startup-headline animation. Use `renderWord` for custom treatment, or skip the component entirely and call `useTypewriter()` yourself.',
		props: [
			{ name: 'words', type: 'string[]', required: true, desc: 'Words to cycle through.' },
			{ name: 'typeMs', type: 'number', default: '70', desc: 'ms per character (typing).' },
			{ name: 'deleteMs', type: 'number', default: '32', desc: 'ms per character (deleting).' },
			{ name: 'holdMs', type: 'number', default: '1500', desc: 'ms to hold the full word.' },
			{ name: 'loop', type: 'boolean', default: 'true', desc: 'Restart at the start once finished.' },
			{ name: 'cursor', type: 'string', default: '"▍"', desc: 'Cursor character.' },
			{ name: 'hideCursor', type: 'boolean', desc: 'Hide the blinking cursor.' },
			{ name: 'renderWord', type: '(word, index) => Snippet', desc: 'Custom word renderer.' },
			{ name: 'onWordReached', type: '(word, index) => void', desc: 'Callback at end of type.' }
		]
	},
	{
		slug: 'word-roll',
		category: 'Heroes',
		name: 'WordRoll',
		snark: 'All the breadth-flexing of a Rotator, without making the visitor wait for it to type.',
		sources: [
			{ name: 'supermemory.ai', url: 'https://supermemory.ai' },
			{ name: 'linear.app', url: 'https://linear.app' }
		],
		extra: 40,
		description:
			'Vertical slide-roll cousin of Rotator. The active word slides in, the previous one slides out, no typing, no cursor. Pass `gradient` to get the AI-pink treatment per-word (don\'t nest inside `<GradientText>`, background-clip:text doesn\'t apply to the absolutely-positioned rolling words).',
		props: [
			{ name: 'words', type: 'string[]', required: true, desc: 'Words to cycle through.' },
			{ name: 'intervalMs', type: 'number', default: '2200', desc: 'ms each word holds before rolling out.' },
			{ name: 'transitionMs', type: 'number', default: '500', desc: 'ms of the slide animation itself.' },
			{ name: 'direction', type: '"up" | "down"', default: '"up"', desc: 'Direction the active word rolls in from.' },
			{
				name: 'gradient',
				type: 'boolean',
				desc: 'Paint each word with the AI gradient. Use instead of nesting in <GradientText>.'
			}
		]
	},
	{
		slug: 'prompt-hero',
		category: 'Heroes',
		name: 'PromptHero',
		snark: 'We replaced the value prop with a text input.',
		sources: [
			{ name: 'lovable.dev', url: 'https://lovable.dev' },
			{ name: 'bolt.new', url: 'https://bolt.new' },
			{ name: 'v0.app', url: 'https://v0.app' },
			{ name: 'magicpatterns.com', url: 'https://www.magicpatterns.com' }
		],
		extra: 80,
		description:
			'The ChatGPT-box-as-CTA. Pair with a Rotator above and you have an entire homepage in five components.',
		props: [
			{ name: 'placeholder', type: 'string', default: '"Describe what you want to build…"', desc: 'Input placeholder.' },
			{ name: 'value', type: 'string', desc: 'Controlled value.' },
			{ name: 'defaultValue', type: 'string', desc: 'Uncontrolled initial value.' },
			{ name: 'onChange', type: '(value: string) => void', desc: 'Fired on every keystroke.' },
			{ name: 'onSubmit', type: '(value: string) => void', desc: 'Fired on form submit.' },
			{ name: 'leading', type: 'Snippet | false', default: 'Sparkle snippet', desc: 'Leading icon.' },
			{ name: 'ctaLabel', type: 'Snippet', default: '"Generate"', desc: 'Submit button label.' },
			{ name: 'hideCta', type: 'boolean', desc: 'Render input-only.' }
		]
	},
	{
		slug: 'prompt',
		category: 'Primitives',
		name: 'Prompt',
		snark: 'The textarea every AI builder ships instead of explaining what their product does.',
		sources: [
			{ name: 'bolt.new', url: 'https://bolt.new' },
			{ name: 'lovable.dev', url: 'https://lovable.dev' },
			{ name: 'v0.app', url: 'https://v0.app' },
			{ name: 'replit.com', url: 'https://replit.com' },
			{ name: 'chatgpt.com', url: 'https://chatgpt.com' }
		],
		extra: 240,
		description:
			'The multi-line prompt box used by every AI builder. Multi-line textarea on top, toolbar on the bottom: a `+` for adding context, a model dropdown, a microphone for voice mode, and a gradient send button. Cmd/Ctrl+Enter submits.',
		props: [
			{ name: 'value', type: 'string', desc: 'Controlled text value.' },
			{ name: 'defaultValue', type: 'string', desc: 'Uncontrolled initial text.' },
			{ name: 'onChange', type: '(value: string) => void', desc: 'Fires on every keystroke.' },
			{ name: 'onSubmit', type: '(value, ctx: {model}) => void', desc: 'Fires on submit (button or Cmd/Ctrl+Enter).' },
			{ name: 'placeholder', type: 'string', default: '"Build me a…"', desc: 'Textarea placeholder.' },
			{ name: 'rows', type: 'number', default: '3', desc: 'Initial textarea height in rows.' },
			{ name: 'models', type: 'string[]', desc: 'Model options for the dropdown.' },
			{ name: 'model', type: 'string', desc: 'Controlled selected model.' },
			{ name: 'defaultModel', type: 'string', desc: 'Uncontrolled initial model.' },
			{ name: 'onModelChange', type: '(model: string) => void', desc: 'Fires when the user picks a model.' },
			{ name: 'onAddContext', type: '() => void', desc: 'Fires when the + button is clicked.' },
			{ name: 'onVoice', type: '() => void', desc: 'Fires when the mic button is clicked.' },
			{ name: 'hideAddContext', type: 'boolean', desc: 'Hide the + button.' },
			{ name: 'hideModel', type: 'boolean', desc: 'Hide the model dropdown.' },
			{ name: 'hideVoice', type: 'boolean', desc: 'Hide the mic button.' },
			{ name: 'hideSend', type: 'boolean', desc: 'Hide the send button.' },
			{ name: 'submitOnCmdEnter', type: 'boolean', default: 'true', desc: 'Submit when Cmd/Ctrl+Enter is pressed.' },
			{
				name: 'toolbarExtras',
				type: 'Snippet',
				desc: 'Extra node rendered just before the mic + send buttons (e.g. a Cmd+↵ hint).'
			}
		]
	},
	{
		slug: 'ascii-hero',
		category: 'Heroes',
		name: 'AsciiHero',
		snark: 'For hackers, by people who follow the right newsletters.',
		sources: [
			{ name: 'opencode.ai', url: 'https://opencode.ai' },
			{ name: 'ghostty.org', url: 'https://ghostty.org' },
			{ name: 'terminal.shop', url: 'https://terminal.shop' },
			{ name: 'supermemory.ai', url: 'https://supermemory.ai' }
		],
		extra: 25,
		description:
			'A canvas-rendered procedural ASCII field that reacts to the cursor. The grid auto-fits its container. Two visual modes: `panel` (default, bordered card) and `bare` (no chrome, intended for background use). Flip on `colorful` for the aurora palette and `spotlightOpacity` to brighten the area under the cursor, perfect for low-opacity backgrounds where the user gets rewarded for hovering.',
		props: [
			{
				name: 'variant',
				type: '"panel" | "bare"',
				default: '"panel"',
				desc: 'panel = bordered card; bare = no chrome (for background use).'
			},
			{ name: 'cols', type: 'number', desc: 'Grid width in cells. Auto-computed from container if omitted.' },
			{ name: 'rows', type: 'number', desc: 'Grid height in cells. Auto-computed from container if omitted.' },
			{ name: 'fontSize', type: 'number', default: '11', desc: 'Character font size (px).' },
			{ name: 'charRamp', type: 'string', desc: 'Sparsest → densest characters.' },
			{ name: 'colorful', type: 'boolean', desc: 'Paint with the default aurora palette.' },
			{ name: 'palette', type: 'string[]', desc: 'Custom palette; overrides `colorful`.' },
			{ name: 'baseOpacity', type: 'number', default: '1', desc: 'Base alpha. Drop low (≈ 0.18) for background use.' },
			{ name: 'reactive', type: 'boolean', default: 'true', desc: 'Enable cursor reactivity.' },
			{
				name: 'rippleStrength',
				type: 'number',
				default: '1.4',
				desc: 'Cursor ripple amplitude (changes which chars show).'
			},
			{ name: 'rippleRadius', type: 'number', default: '6', desc: 'Cursor ripple falloff radius (cells).' },
			{
				name: 'spotlightOpacity',
				type: 'number',
				desc: 'Alpha at the cursor center; falls off radially to baseOpacity.'
			},
			{ name: 'spotlightRadius', type: 'number', default: '8', desc: 'Cursor spotlight radius (cells).' },
			{ name: 'frameMs', type: 'number', default: '50', desc: 'Frame throttle (ms).' }
		]
	},
	{
		slug: 'aurora',
		category: 'Backgrounds',
		name: 'Aurora',
		snark: 'Three blobs and a generation defined.',
		sources: [
			{ name: 'vercel.com', url: 'https://vercel.com' },
			{ name: 'linear.app', url: 'https://linear.app' },
			{ name: 'mistral.ai', url: 'https://mistral.ai' },
			{ name: 'openai.com', url: 'https://openai.com' }
		],
		extra: 700,
		description:
			'Drifting radial gradient blobs. Sits absolutely inside its `position: relative` parent. Override `blobs` for any palette you want; in good taste or otherwise.',
		props: [
			{ name: 'blobs', type: '{color,x,y,size?}[]', desc: 'Color stops with positions (0–100%).' },
			{ name: 'blur', type: 'number', default: '50', desc: 'CSS blur in px.' },
			{ name: 'static', type: 'boolean', desc: 'Disable the slow drift.' },
			{
				name: 'animated',
				type: 'boolean',
				desc: 'Lava-lamp mode, blobs become independent bubbles that push each other around. Overrides the CSS drift.'
			},
			{
				name: 'repulsion',
				type: 'number',
				default: '0.18',
				desc: 'When animated, how aggressively blobs push each other apart (0 disables interaction).'
			}
		]
	},
	{
		slug: 'node-graph',
		category: 'Backgrounds',
		name: 'NodeGraphBackground',
		snark: 'A neural network, conceptually.',
		sources: [
			{ name: 'pinecone.io', url: 'https://www.pinecone.io' },
			{ name: 'cerebras.ai', url: 'https://cerebras.ai' },
			{ name: 'scale.com', url: 'https://scale.com' },
			{ name: 'deepgram.com', url: 'https://deepgram.com' }
		],
		extra: 220,
		description:
			'Canvas-rendered drifting nodes with proximity-based links. Reacts to the cursor (pulls nodes within `hoverDistance`). Zero JS dependencies.',
		props: [
			{ name: 'density', type: 'number', default: '70', desc: 'Number of nodes.' },
			{ name: 'speed', type: 'number', default: '0.4', desc: 'Pixel speed per frame.' },
			{ name: 'linkDistance', type: 'number', default: '140', desc: 'Max px between linked nodes.' },
			{ name: 'colors', type: 'string[]', desc: 'Pool of node colors.' },
			{ name: 'linkColor', type: 'string', default: '"#7c3aed"', desc: 'Link stroke color.' },
			{
				name: 'baseOpacity',
				type: 'number',
				default: '0.45',
				desc: 'Resting alpha of nodes + edges. Field is dim at rest; cursor brightens it.'
			},
			{
				name: 'hoverDistance',
				type: 'number',
				default: '200',
				desc: 'Radius of cursor effects (gravity + brighten). 0 disables both.'
			},
			{
				name: 'hoverGravity',
				type: 'number',
				default: '0.005',
				desc: '0–1 strength of cursor pull. Default is very subtle drift; set higher for stronger attraction.'
			},
			{ name: 'hoverBrighten', type: 'number', default: '0.8', desc: '0–1 strength of opacity boost near the cursor.' },
			{
				name: 'overscan',
				type: 'number',
				default: '80',
				desc: 'px the simulation world extends past the visible viewport, nodes bounce off the world edges, drifting in/out of view.'
			}
		]
	},
	{
		slug: 'floating-sparkles',
		category: 'Backgrounds',
		name: 'FloatingSparkles',
		snark: 'Magic doesn\'t ship itself.',
		sources: [
			{ name: 'notion.com/product/ai', url: 'https://www.notion.com/product/ai' },
			{ name: 'granola.ai', url: 'https://www.granola.ai' }
		],
		extra: 90,
		description:
			'A field of ✦ glyphs drifting upward. Pure CSS, randomized once per mount. Drop inside any `position: relative` parent.',
		props: [
			{ name: 'count', type: 'number', default: '18', desc: 'Number of sparkles.' },
			{ name: 'glyphs', type: 'string[]', desc: 'Pool of glyphs.' },
			{ name: 'durationS', type: '[number, number]', default: '[8, 18]', desc: '[min, max] seconds.' },
			{ name: 'sizeRange', type: '[number, number]', default: '[8, 20]', desc: '[min, max] px font size.' }
		]
	},
	{
		slug: 'glass-card',
		category: 'Surfaces',
		name: 'GlassCard',
		snark: 'Backdrop-filter: ambition.',
		sources: [
			{ name: 'vercel.com', url: 'https://vercel.com' },
			{ name: 'linear.app', url: 'https://linear.app' },
			{ name: 'openai.com', url: 'https://openai.com' }
		],
		extra: 1500,
		description:
			'Glassmorphism feature card. Compound parts let you rearrange or swap sections. `breathing` toggles a slow box-shadow pulse; `glowOnHover` reveals a gradient halo on hover.',
		props: [
			{ name: 'breathing', type: 'boolean', desc: 'Slow shadow pulse.' },
			{ name: 'glowOnHover', type: 'boolean', default: 'true', desc: 'Gradient halo on hover.' }
		],
		subprops: [
			{ name: 'GlassCard.Icon', props: [] },
			{ name: 'GlassCard.Title', props: [] },
			{ name: 'GlassCard.Body', props: [] },
			{
				name: 'GlassCard.Link',
				props: [
					{ name: 'href', type: 'string', desc: 'Anchor target.' }
				]
			}
		]
	},
	{
		slug: 'mock-ide',
		category: 'Surfaces',
		name: 'MockIDE',
		snark: 'Real code is coming. This is the trailer.',
		sources: [
			{ name: 'cursor.com', url: 'https://cursor.com' },
			{ name: 'v0.app', url: 'https://v0.app' },
			{ name: 'cognition.ai', url: 'https://www.cognition.ai' },
			{ name: 'magic.dev', url: 'https://magic.dev' }
		],
		extra: 65,
		description:
			'Mock IDE that streams pretokenized code character-by-character with a blinking caret. Pass an array of `IdeToken` objects; each has a class hint for color (key, str, num, com, fn).',
		props: [
			{ name: 'filename', type: 'string', desc: 'Shown in the tab.' },
			{ name: 'tokens', type: 'IdeToken[]', desc: 'Source tokens to type out.' },
			{ name: 'loop', type: 'boolean', default: 'true', desc: 'Restart after a 3s pause.' },
			{ name: 'charMs', type: '[number, number]', default: '[14, 42]', desc: 'Per-char delay range.' },
			{
				name: 'thinkingLabel',
				type: 'Snippet | false',
				default: '"AI is writing…"',
				desc: 'Pill label; false to hide.'
			}
		],
		subprops: [
			{
				name: 'MockIDE.Chrome',
				props: [
					{ name: 'filename', type: 'string', desc: 'Tab label.' },
					{ name: 'thinking', type: 'Snippet | false', desc: 'Pill content.' }
				]
			},
			{
				name: 'MockIDE.Body',
				props: [
					{ name: 'tokens', type: 'IdeToken[]', required: true, desc: 'Tokens to stream.' },
					{ name: 'loop', type: 'boolean', desc: 'Loop after finishing.' }
				]
			}
		]
	},
	{
		slug: 'chat-bubble',
		category: 'Conversation',
		name: 'ChatBubble',
		snark: 'If it\'s in a bubble, it must be true.',
		sources: [
			{ name: 'chatgpt.com', url: 'https://chatgpt.com' },
			{ name: 'claude.ai', url: 'https://claude.ai' },
			{ name: 'perplexity.ai', url: 'https://perplexity.ai' },
			{ name: 'sierra.ai', url: 'https://sierra.ai' }
		],
		extra: 250,
		description:
			'Chat bubbles for fake conversations. AI bubbles ship with a meta row (sparkle + agent name + thinking pill); replace any of those by passing props or `false`.',
		props: [
			{ name: 'role', type: '"user" | "ai"', required: true, desc: 'Bubble direction + styling.' },
			{ name: 'agent', type: 'Snippet', desc: 'Agent name (AI bubbles).' },
			{ name: 'thinking', type: 'Snippet | false', desc: 'Thinking pill content; false to hide.' },
			{ name: 'icon', type: 'Snippet | false', desc: 'Leading icon override.' }
		]
	},
	{
		slug: 'token-stream',
		category: 'Conversation',
		name: 'TokenStream',
		snark: 'Server-sent events (SSE) were added to the HTML5 spec in 2008 but never used until 2025.',
		sources: [
			{ name: 'chatgpt.com', url: 'https://chatgpt.com' },
			{ name: 'claude.ai', url: 'https://claude.ai' },
			{ name: 'perplexity.ai', url: 'https://perplexity.ai' }
		],
		extra: 1800,
		description:
			'Reveals a string token-by-token with a trailing blinking caret. Pair with a `<ChatBubble role=\'ai\'>` for the platonic \'reasoning, but visibly\' demo. Bring your own tokenizer.',
		props: [
			{ name: 'text', type: 'string', required: true, desc: 'The full text to reveal.' },
			{
				name: 'speedMs',
				type: 'number | [number, number]',
				default: '[18, 80]',
				desc: 'Per-token delay (range = jitter).'
			},
			{ name: 'tokenize', type: '(s: string) => string[]', desc: 'Custom splitter. Default: words + whitespace.' },
			{ name: 'loop', type: 'boolean', desc: 'Loop after a delay.' },
			{ name: 'loopDelayMs', type: 'number', default: '6000', desc: 'Pause before restarting.' },
			{ name: 'hideCaret', type: 'boolean', desc: 'Hide the trailing caret.' },
			{ name: 'onComplete', type: '() => void', desc: 'Fired when full text is shown.' }
		]
	},
	{
		slug: 'chat-fab',
		category: 'Conversation',
		name: 'ChatFAB',
		snark: 'There\'s no escape now.',
		sources: [
			{ name: 'intercom.com (Fin)', url: 'https://www.intercom.com/fin' },
			{ name: 'sierra.ai', url: 'https://sierra.ai' },
			{ name: 'decagon.ai', url: 'https://decagon.ai' }
		],
		extra: 320,
		description:
			'Bottom-right floating \'Ask AI\' button with a popover. Compose ChatFAB.Header and ChatFAB.Body for the popover contents; the close button uses context so it just works.',
		props: [
			{ name: 'label', type: 'Snippet', default: '"Ask AI"', desc: 'Button label.' },
			{ name: 'open', type: 'boolean', desc: 'Controlled open state.' },
			{ name: 'defaultOpen', type: 'boolean', desc: 'Uncontrolled initial state.' },
			{ name: 'onOpenChange', type: '(open: boolean) => void', desc: 'Open-state callback.' },
			{ name: 'popover', type: 'Snippet', desc: 'Popover contents.' }
		]
	},
	{
		slug: 'logo-marquee',
		category: 'Social Proof',
		name: 'LogoMarquee',
		snark: 'Trusted by everyone you\'ve heard of, including the ones that didn\'t sign.',
		sources: [
			{ name: 'glean.com', url: 'https://www.glean.com' },
			{ name: 'decagon.ai', url: 'https://decagon.ai' },
			{ name: 'cresta.com', url: 'https://www.cresta.com' },
			{ name: 'harvey.ai', url: 'https://www.harvey.ai' },
			{ name: 'sierra.ai', url: 'https://sierra.ai' }
		],
		extra: 900,
		description:
			'Infinite-scroll logo wall. Mix `img` and `node` entries to combine real logos (via simple-icons) with text-only ones (Bloomberg, NASA, Harvard). Duplicates the track for a seamless loop.',
		props: [
			{ name: 'logos', type: 'MarqueeItem[]', required: true, desc: 'Mix of img/node entries.' },
			{ name: 'speed', type: 'number', default: '40', desc: 'Seconds per loop.' },
			{ name: 'gap', type: 'number', default: '56', desc: 'Pixel gap between items.' },
			{ name: 'fade', type: 'boolean', default: 'true', desc: 'Edge-fade mask.' },
			{ name: 'pauseOnHover', type: 'boolean', desc: 'Pause animation on hover.' }
		]
	},
	{
		slug: 'logo-row',
		category: 'Social Proof',
		name: 'LogoRow',
		snark: 'Static logos are for when you only have six.',
		sources: [
			{ name: 'anthropic.com', url: 'https://www.anthropic.com' },
			{ name: 'elicit.com', url: 'https://elicit.com' },
			{ name: 'consensus.app', url: 'https://consensus.app' }
		],
		extra: 400,
		description:
			'Static row of logos with an uppercase eyebrow. Works equally well for \'Backed by\', \'From alumni of\', or \'As seen in\'.',
		props: [
			{ name: 'heading', type: 'Snippet', desc: 'Uppercase header copy.' },
			{ name: 'logos', type: 'LogoRowItem[]', required: true, desc: 'Mix of img/node entries.' }
		]
	},
	{
		slug: 'stat-counter',
		category: 'Social Proof',
		name: 'StatCounter',
		snark: 'Numbers that go up are better than numbers that don\'t.',
		sources: [
			{ name: 'mistral.ai', url: 'https://mistral.ai' },
			{ name: 'openai.com', url: 'https://openai.com' },
			{ name: 'ollama.com', url: 'https://ollama.com' }
		],
		extra: 600,
		description:
			'Animates a number from `from` (default 0) to `target` over `durationMs`. Pass `format` to control display. Or skip the component entirely and use `useCounter()` to drive your own UI.',
		props: [
			{ name: 'target', type: 'number', required: true, desc: 'End value.' },
			{ name: 'from', type: 'number', default: '0', desc: 'Start value.' },
			{ name: 'durationMs', type: 'number', default: '1800', desc: 'Total animation length.' },
			{ name: 'ease', type: '(t: number) => number', desc: 'Custom easing (default ease-out-cubic).' },
			{ name: 'format', type: '(n: number) => string', desc: 'Display format.' }
		]
	},
	{
		slug: 'community-badge',
		category: 'Social Proof',
		name: 'CommunityBadge',
		snark: 'Stars are the new MAU.',
		sources: [
			{ name: 'ollama.com', url: 'https://ollama.com' },
			{ name: 'langchain.com', url: 'https://www.langchain.com' },
			{ name: 'fal.ai', url: 'https://fal.ai' },
			{ name: 'together.ai', url: 'https://together.ai' }
		],
		extra: 180,
		description:
			'The \'Star us on GitHub\' / \'Join the Discord\' tile. Pass `icon` for a URL or `iconNode` for full control.',
		props: [
			{ name: 'icon', type: 'string', desc: 'SVG URL (gets inverted via CSS filter).' },
			{ name: 'iconNode', type: 'Snippet', desc: 'Custom icon node.' },
			{ name: 'title', type: 'Snippet', required: true, desc: 'Primary label.' },
			{ name: 'subtitle', type: 'Snippet', required: true, desc: 'Secondary label (counts, captions).' },
			{ name: 'href', type: 'string', desc: 'Anchor target (renders as `<a>`).' }
		]
	},
	{
		slug: 'pricing-card',
		category: 'Pricing & Conversion',
		name: 'PricingCard',
		snark: 'The middle one is glowing. Choose accordingly.',
		sources: [
			{ name: 'vercel.com/pricing', url: 'https://vercel.com/pricing' },
			{ name: 'linear.app/pricing', url: 'https://linear.app/pricing' },
			{ name: 'anthropic.com/pricing', url: 'https://www.anthropic.com/pricing' }
		],
		extra: 5000,
		description:
			'Compound pricing tile. The `featured` prop applies the gradient border + lift used for the \'Most popular\' tier. Compose any subset of subcomponents in any order.',
		props: [
			{ name: 'featured', type: 'boolean', desc: 'Gradient border + glow + lift.' }
		],
		subprops: [
			{
				name: 'PricingCard.Flag',
				props: [
					{ name: 'hideSparkle', type: 'boolean', desc: 'Drop the leading ✦.' }
				]
			},
			{ name: 'PricingCard.Tier', props: [] },
			{
				name: 'PricingCard.Amount',
				props: [
					{ name: 'unit', type: 'Snippet', desc: 'Suffix like /mo.' }
				]
			},
			{ name: 'PricingCard.Blurb', props: [] },
			{ name: 'PricingCard.Features', props: [] },
			{
				name: 'PricingCard.CTA',
				props: [
					{ name: 'href', type: 'string', desc: 'Anchor target.' }
				]
			}
		]
	},
	{
		slug: 'before-after',
		category: 'Pricing & Conversion',
		name: 'BeforeAfter',
		snark: 'On the left: chaos. On the right: us.',
		sources: [
			{ name: 'notion.com/product/ai', url: 'https://www.notion.com/product/ai' },
			{ name: 'granola.ai', url: 'https://www.granola.ai' },
			{ name: 'otter.ai', url: 'https://otter.ai' }
		],
		extra: 850,
		description:
			'Side-by-side comparison. The left panel is muted + struck-through; the right glows. Pass `before`/`after` arrays for the lazy version, or compose subcomponents for full control.',
		props: [
			{ name: 'before', type: 'Snippet[]', desc: 'Quick-form before items.' },
			{ name: 'after', type: 'Snippet[]', desc: 'Quick-form after items.' },
			{ name: 'brand', type: 'Snippet', desc: 'Name shown over the arrow.' },
			{ name: 'beforeLabel', type: 'Snippet', default: '"Before"', desc: 'Override label.' },
			{ name: 'afterLabel', type: 'Snippet', default: '"After"', desc: 'Override label.' }
		],
		subprops: [
			{
				name: 'BeforeAfter.Before',
				props: [
					{ name: 'label', type: 'Snippet', desc: 'Tag label.' }
				]
			},
			{
				name: 'BeforeAfter.Arrow',
				props: [
					{ name: 'brand', type: 'Snippet', desc: 'Brand label.' }
				]
			},
			{
				name: 'BeforeAfter.After',
				props: [
					{ name: 'label', type: 'Snippet', desc: 'Tag label.' }
				]
			}
		]
	},
	{
		slug: 'waitlist-form',
		category: 'Pricing & Conversion',
		name: 'WaitlistForm',
		snark: 'Demand we manufactured ourselves.',
		sources: [
			{ name: 'lindy.ai', url: 'https://www.lindy.ai' },
			{ name: 'magic.dev', url: 'https://magic.dev' },
			{ name: 'reflect.app', url: 'https://reflect.app' }
		],
		extra: 2400,
		description:
			'Inline email-capture. Pair with a `<StatCounter target={8247} />` above for the obligatory \'Join 8,247 builders\' headline.',
		props: [
			{ name: 'placeholder', type: 'string', default: '"you@startup.ai"', desc: 'Input placeholder.' },
			{ name: 'defaultValue', type: 'string', desc: 'Initial email value.' },
			{ name: 'ctaLabel', type: 'Snippet', default: '"Notify me"', desc: 'Submit button label.' },
			{
				name: 'leading',
				type: 'Snippet | false',
				desc: 'Leading icon. Defaults to an envelope SVG; pass false to remove or any node to replace.'
			},
			{ name: 'footnote', type: 'Snippet', desc: 'Small line of text rendered below the form.' },
			{ name: 'onSubmit', type: '(email: string) => void', desc: 'Submit callback.' }
		]
	},
	{
		slug: 'popover',
		category: 'Pricing & Conversion',
		name: 'Popover',
		snark: 'Built for conversion, not consent.',
		sources: [],
		description:
			'The obtrusive newsletter modal every AI startup deploys. Takes over the entire viewport with a blurred backdrop. By design, neither the Escape key nor backdrop clicks close it; the visitor either submits the form inside or clicks the tiny dismissal link at the bottom. Pair with `timer` to auto-open after the visitor has skimmed a few paragraphs.',
		props: [
			{ name: 'open', type: 'boolean', desc: 'Controlled open state.' },
			{ name: 'defaultOpen', type: 'boolean', desc: 'Uncontrolled initial state.' },
			{ name: 'onOpenChange', type: '(open: boolean) => void', desc: 'Open-state callback.' },
			{ name: 'timer', type: 'number', default: '0', desc: 'ms before auto-opening once mounted. 0 disables.' },
			{ name: 'title', type: 'Snippet', desc: 'Title at the top of the popover.' },
			{ name: 'children', type: 'Snippet', desc: 'Body content (e.g. a WaitlistForm).' },
			{
				name: 'closeLabel',
				type: 'Snippet | false',
				default: '"Maybe later"',
				desc: 'Small dismissal link rendered under the body. false to hide.'
			},
			{
				name: 'closeOnEscape',
				type: 'boolean',
				default: 'false',
				desc: 'Allow the Escape key to close. Default false (obtrusive by design).'
			},
			{
				name: 'closeOnBackdrop',
				type: 'boolean',
				default: 'false',
				desc: 'Allow backdrop clicks to close. Default false.'
			},
			{
				name: 'container',
				type: 'HTMLElement | null',
				desc: 'Portal target. Defaults to document.body so the popover covers the viewport.'
			}
		]
	}
];

export const ORDERED_COMPONENTS = COMPONENTS;
