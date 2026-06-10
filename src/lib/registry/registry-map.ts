export type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:file"
  | "registry:hook"
  | "registry:lib"
  | "registry:style"
  | "registry:ui";

export interface RegistryFile {
  path: string;
  target?: string;
  type?: RegistryItemType;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
}

export const REGISTRY_SCHEMA = "https://shadcn-svelte.com/schema/registry.json";
export const REGISTRY_ITEM_SCHEMA =
  "https://shadcn-svelte.com/schema/registry-item.json";
export const REGISTRY_NAME = "performative-ui-svelte";
export const REGISTRY_HOMEPAGE =
  "https://benjamin-brady.github.io/performative-ui-svelte/";
export const REGISTRY_BASE_URL = `${REGISTRY_HOMEPAGE.replace(/\/$/, "")}/registry`;

export const REGISTRY_ALIASES = {
  components: "$lib/components",
  utils: "$lib/utils",
  hooks: "$lib/hooks",
  styles: "$lib/styles",
  css: "src/app.css",
  lib: "$lib",
} as const;

const unique = (values: string[]) => Array.from(new Set(values));

const file = (
  path: string,
  target: string,
  type: RegistryItemType,
): RegistryFile => ({
  path,
  target,
  type,
});

const componentFile = (name: string): RegistryFile =>
  file(
    `src/lib/components/${name}.svelte`,
    `$lib/components/${name}.svelte`,
    "registry:ui",
  );

const hookFile = (name: string): RegistryFile =>
  file(
    `src/lib/hooks/${name}.svelte.ts`,
    `$lib/hooks/${name}.svelte.ts`,
    "registry:hook",
  );

const ui = (
  item: Omit<RegistryItem, "type" | "files" | "registryDependencies"> & {
    files: string[];
    registryDependencies?: string[];
  },
): RegistryItem => ({
  ...item,
  type: "registry:ui",
  files: item.files.map(componentFile),
  // The "theme" dependency writes src/app.css, which already inlines every
  // performative keyframe, so components only need utils + theme by default.
  registryDependencies: unique([
    "utils",
    "theme",
    ...(item.registryDependencies ?? []),
  ]),
});

export const registryItems: RegistryItem[] = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Utilities",
    description:
      "Shared class-name helper for clsx composition and Tailwind conflict merging.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [file("src/lib/utils/cn.ts", "$lib/utils/cn.ts", "registry:lib")],
    categories: ["Utilities"],
  },
  {
    name: "theme",
    // registry:file (not registry:style) so shadcn-svelte writes the stylesheet
    // to disk. The installer ignores file content for registry:style/theme items
    // and only applies their structured cssVars/css fields, which this
    // hand-authored Tailwind v4 entry does not use. The target is fixed at
    // src/app.css (the shadcn-svelte css convention and REGISTRY_ALIASES.css):
    // make that file your Tailwind entry and import it from your root layout.
    type: "registry:file",
    title: "Performative UI Tailwind theme",
    description:
      "Tailwind v4 imports, source directives, OKLCH tokens, data variants, base styles, and shared keyframes.",
    files: [file("src/app.css", "src/app.css", "registry:file")],
    categories: ["Utilities"],
  },
  {
    name: "use-typewriter",
    type: "registry:hook",
    title: "useTypewriter",
    description: "Headless Svelte typewriter state used by Rotator.",
    files: [hookFile("useTypewriter")],
    categories: ["Utilities"],
  },
  {
    name: "use-counter",
    type: "registry:hook",
    title: "useCounter",
    description: "Headless count-up state used by StatCounter.",
    files: [hookFile("useCounter")],
    categories: ["Utilities"],
  },
  {
    name: "use-token-stream",
    type: "registry:hook",
    title: "useTokenStream",
    description: "Headless token streaming state used by TokenStream.",
    files: [hookFile("useTokenStream")],
    categories: ["Utilities"],
  },
  {
    name: "use-ascii-field",
    type: "registry:hook",
    title: "useAsciiField",
    description: "Headless canvas particle field state used by AsciiHero.",
    files: [hookFile("useAsciiField")],
    categories: ["Utilities"],
  },
  ui({
    name: "sparkle",
    title: "Sparkle",
    description:
      "Four-point gradient sparkle glyph with optional twinkle animation.",
    files: ["Sparkle"],
    categories: ["Atoms"],
  }),
  ui({
    name: "gradient-text",
    title: "GradientText",
    description: "Gradient-clipped text wrapper with optional animated shift.",
    files: ["GradientText"],
    categories: ["Atoms"],
  }),
  ui({
    name: "status-dot",
    title: "StatusDot",
    description: "Small status indicator with optional pulse animation.",
    files: ["StatusDot"],
    categories: ["Atoms"],
  }),
  ui({
    name: "button",
    title: "Button",
    description:
      "Polymorphic performative button with glow, shimmer, ghost, solid, and wave variants.",
    files: ["Button"],
    dependencies: ["tailwind-variants"],
    registryDependencies: ["sparkle"],
    categories: ["Primitives"],
  }),
  ui({
    name: "sticky-banner",
    title: "StickyBanner",
    description: "Sticky announcement banner for funding news and beta badges.",
    files: ["StickyBanner"],
    registryDependencies: ["sparkle"],
    categories: ["Banners"],
  }),
  ui({
    name: "eyebrow-pill",
    title: "EyebrowPill",
    description: "Rounded eyebrow badge with a default status dot.",
    files: ["EyebrowPill"],
    registryDependencies: ["status-dot"],
    categories: ["Primitives"],
  }),
  ui({
    name: "rotator",
    title: "Rotator",
    description: "Type, hold, delete, and rotate through headline words.",
    files: ["Rotator"],
    registryDependencies: ["use-typewriter"],
    categories: ["Heroes"],
  }),
  ui({
    name: "word-roll",
    title: "WordRoll",
    description: "Vertical slide-roll word rotator for headline alternates.",
    files: ["WordRoll"],
    categories: ["Heroes"],
  }),
  ui({
    name: "prompt-hero",
    title: "PromptHero",
    description:
      "Single-line AI prompt hero with CTA and rotating placeholders.",
    files: ["PromptHero"],
    registryDependencies: ["button", "sparkle"],
    categories: ["Heroes"],
  }),
  ui({
    name: "prompt",
    title: "Prompt",
    description: "Multi-line AI prompt box with toolbar and model menu.",
    files: ["Prompt"],
    categories: ["Heroes"],
  }),
  ui({
    name: "ascii-hero",
    title: "AsciiHero",
    description: "Canvas-rendered ASCII particle hero field.",
    files: ["AsciiHero"],
    registryDependencies: ["use-ascii-field"],
    categories: ["Heroes"],
  }),
  ui({
    name: "aurora",
    title: "Aurora",
    description: "Animated radial-gradient aurora background layer.",
    files: ["Aurora"],
    categories: ["Backgrounds"],
  }),
  ui({
    name: "node-graph",
    title: "NodeGraphBackground",
    description: "Animated node graph canvas background.",
    files: ["NodeGraphBackground"],
    categories: ["Backgrounds"],
  }),
  ui({
    name: "floating-sparkles",
    title: "FloatingSparkles",
    description: "Ambient floating sparkle field for landing-page backgrounds.",
    files: ["FloatingSparkles"],
    categories: ["Backgrounds"],
  }),
  ui({
    name: "glass-card",
    title: "GlassCard",
    description: "Glassmorphic card shell and compound content pieces.",
    files: [
      "GlassCard",
      "GlassCardIcon",
      "GlassCardTitle",
      "GlassCardBody",
      "GlassCardLink",
    ],
    categories: ["Surfaces"],
  }),
  ui({
    name: "mock-ide",
    title: "MockIDE",
    description:
      "Mock code editor surface with chrome and token-streaming body.",
    files: ["MockIDE", "MockIDEChrome", "MockIDEBody"],
    categories: ["Surfaces"],
  }),
  ui({
    name: "chat-bubble",
    title: "ChatBubble",
    description:
      "Assistant or user chat bubble with optional sparkle affordance.",
    files: ["ChatBubble"],
    registryDependencies: ["sparkle"],
    categories: ["Conversation"],
  }),
  ui({
    name: "token-stream",
    title: "TokenStream",
    description: "Streaming token renderer backed by a headless Svelte hook.",
    files: ["TokenStream"],
    registryDependencies: ["use-token-stream"],
    categories: ["Conversation"],
  }),
  ui({
    name: "chat-fab",
    title: "ChatFAB",
    description:
      "Floating chat button with composable popover header and body.",
    files: ["ChatFAB", "ChatFABHeader", "ChatFABBody"],
    registryDependencies: ["sparkle"],
    categories: ["Conversation"],
  }),
  ui({
    name: "logo-marquee",
    title: "LogoMarquee",
    description: "Scrolling logo or text marquee for social proof strips.",
    files: ["LogoMarquee"],
    categories: ["Social Proof"],
  }),
  ui({
    name: "logo-row",
    title: "LogoRow",
    description: "Centered row of customer logos or text marks.",
    files: ["LogoRow"],
    categories: ["Social Proof"],
  }),
  ui({
    name: "slippy-words",
    title: "SlippyWords",
    description:
      "Rows of word badges that slide horizontally in alternating directions, driven by scroll position.",
    files: ["SlippyWords"],
    categories: ["Social Proof"],
  }),
  ui({
    name: "stat-counter",
    title: "StatCounter",
    description:
      "Animated count-up statistic powered by a reusable counter hook.",
    files: ["StatCounter"],
    registryDependencies: ["use-counter"],
    categories: ["Social Proof"],
  }),
  ui({
    name: "community-badge",
    title: "CommunityBadge",
    description:
      "Inline community/social proof badge with optional avatar stack.",
    files: ["CommunityBadge"],
    categories: ["Social Proof"],
  }),
  ui({
    name: "pricing-card",
    title: "PricingCard",
    description:
      "Composable pricing card shell with tier, amount, feature, flag, and CTA pieces.",
    files: [
      "PricingCard",
      "PricingTier",
      "PricingAmount",
      "PricingBlurb",
      "PricingFeatures",
      "PricingFlag",
      "PricingCTA",
    ],
    registryDependencies: ["sparkle"],
    categories: ["Pricing & Conversion"],
  }),
  ui({
    name: "before-after",
    title: "BeforeAfter",
    description:
      "Before/after comparison layout with compound panels and center arrow.",
    files: [
      "BeforeAfter",
      "BeforeAfterBefore",
      "BeforeAfterAfter",
      "BeforeAfterArrow",
    ],
    registryDependencies: ["sparkle"],
    categories: ["Pricing & Conversion"],
  }),
  ui({
    name: "waitlist-form",
    title: "WaitlistForm",
    description:
      "Email capture form that composes the performative Button component.",
    files: ["WaitlistForm"],
    registryDependencies: ["button"],
    categories: ["Pricing & Conversion"],
  }),
  ui({
    name: "popover",
    title: "Popover",
    description:
      "Timed modal popover with Bits UI Portal support and controlled state.",
    files: ["Popover"],
    dependencies: ["bits-ui", "esm-env"],
    categories: ["Pricing & Conversion"],
  }),
];

export const registryItemMap = new Map(
  registryItems.map((item) => [item.name, item]),
);
