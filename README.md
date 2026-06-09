# performative-ui-svelte

AI-native **Svelte 5** components that signal how oversubscribed your funding round is. Tongue firmly in cheek.

A Svelte port of [performative-ui](https://github.com/vorpus/performativeUI) by vorpus, with a live documentation site for every component.

## Install

Not published to npm yet. Install directly from GitHub:

```sh
npm install github:benjamin-brady/performative-ui-svelte
```

The GitHub install runs the package `prepare` script, which builds `dist/` with `@sveltejs/package`. Keep lifecycle scripts enabled for this dependency.

### Recommended: registry-first

This project is designed for registry/copy-in usage so your app owns the
Tailwind build, theme tokens, and generated utilities.

### Package fallback

The package fallback exports Svelte components that already contain Tailwind
utility classes. It does **not** ship generated component CSS. Importing
`performative-ui-svelte/styles.css` only provides shared animation keyframes.

For package usage, your app must use Tailwind CSS v4, include the performative
theme tokens from `src/app.css` (or copied registry theme), and scan the package
components from your Tailwind entry:

```css
@import "tailwindcss";
@source "../node_modules/performative-ui-svelte/dist";
@import "performative-ui-svelte/styles.css";
```

Then use the components:

```svelte
<script>
  import "performative-ui-svelte/styles.css";
  import { Button, GradientText, Sparkle } from "performative-ui-svelte";
</script>

<h1>Ship <GradientText>agentic workflows</GradientText> <Sparkle /></h1>
<Button variant="glow" sparkle>Generate</Button>
```

## Components

All 27 components from the original catalog are ported:

- **Atoms:** `Sparkle`, `GradientText`, `StatusDot`
- **Primitives:** `Button`, `EyebrowPill`, `Prompt`, `StickyBanner`
- **Heroes:** `Rotator`, `WordRoll`, `PromptHero`, `AsciiHero`
- **Backgrounds:** `Aurora`, `NodeGraphBackground`, `FloatingSparkles`
- **Surfaces:** `GlassCard`, `MockIDE`
- **Conversation:** `ChatBubble`, `TokenStream`, `ChatFAB`
- **Social proof:** `LogoMarquee`, `LogoRow`, `StatCounter`, `CommunityBadge`
- **Pricing & conversion:** `PricingCard`, `BeforeAfter`, `WaitlistForm`, `Popover`

React compound components are adapted to Svelte named exports re-exported from the parent:

```svelte
<script>
  import {
    GlassCard,
    GlassCardIcon,
    GlassCardTitle,
    GlassCardBody,
    GlassCardLink
  } from "performative-ui-svelte";
</script>

<GlassCard breathing>
  <GlassCardIcon>+</GlassCardIcon>
  <GlassCardTitle>Reason</GlassCardTitle>
  <GlassCardBody>Multi-step, multi-modal, multi-vendor.</GlassCardBody>
  <GlassCardLink href="/learn">Learn more</GlassCardLink>
</GlassCard>
```

Headless hooks are exported as escape hatches: `useTypewriter`, `useCounter`, `useTokenStream`, `useAsciiField`, plus the `cn` class helper.

## Development

```sh
npm install
npm run dev        # docs / showcase app
npm run check      # type-check
npm run package    # build the distributable library into dist/
npm run build      # build the static docs site
```

## Attribution

This project is a Svelte port of [performative-ui](https://github.com/vorpus/performativeUI) by vorpus. The original package is marked MIT licensed in its package metadata and README. See [`NOTICE`](./NOTICE).

## License

MIT — see [`LICENSE`](./LICENSE).
