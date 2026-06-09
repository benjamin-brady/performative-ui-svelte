/**
 * performative-ui (Svelte 5 port), components for the world's most
 * performative AI-startup landing page tropes. Tongue firmly in cheek.
 */

// Atoms
export { default as Sparkle, type SparkleProps } from './components/Sparkle.svelte';
export { default as GradientText, type GradientTextProps } from './components/GradientText.svelte';
export { default as StatusDot, type StatusDotProps } from './components/StatusDot.svelte';

// Primitives
export {
default as Button,
type ButtonProps,
type ButtonVariant,
type ButtonSize
} from './components/Button.svelte';
export { default as StickyBanner, type StickyBannerProps } from './components/StickyBanner.svelte';
export { default as EyebrowPill, type EyebrowPillProps } from './components/EyebrowPill.svelte';

// Heroes
export { default as Rotator, type RotatorProps } from './components/Rotator.svelte';
export { default as WordRoll, type WordRollProps } from './components/WordRoll.svelte';
export { default as PromptHero, type PromptHeroProps } from './components/PromptHero.svelte';
export { default as Prompt, type PromptProps } from './components/Prompt.svelte';
export { default as AsciiHero, type AsciiHeroProps } from './components/AsciiHero.svelte';

// Backgrounds
export { default as Aurora, type AuroraProps } from './components/Aurora.svelte';
export {
default as NodeGraphBackground,
type NodeGraphBackgroundProps
} from './components/NodeGraphBackground.svelte';
export {
default as FloatingSparkles,
type FloatingSparklesProps
} from './components/FloatingSparkles.svelte';

// Surfaces
export {
default as GlassCard,
GlassCardIcon,
GlassCardTitle,
GlassCardBody,
GlassCardLink,
type GlassCardProps
} from './components/GlassCard.svelte';
export {
default as MockIDE,
MockIDEChrome,
MockIDEBody,
type MockIDEProps,
type IdeToken,
type IdeTokenClass
} from './components/MockIDE.svelte';

// Conversation
export {
default as ChatBubble,
type ChatBubbleProps,
type ChatRole
} from './components/ChatBubble.svelte';
export { default as TokenStream, type TokenStreamProps } from './components/TokenStream.svelte';
export {
default as ChatFAB,
ChatFABHeader,
ChatFABBody,
type ChatFABProps
} from './components/ChatFAB.svelte';

// Social proof
export {
default as LogoMarquee,
type LogoMarqueeProps,
type MarqueeItem
} from './components/LogoMarquee.svelte';
export {
default as LogoRow,
type LogoRowProps,
type LogoRowItem
} from './components/LogoRow.svelte';
export { default as StatCounter, type StatCounterProps } from './components/StatCounter.svelte';
export {
default as CommunityBadge,
type CommunityBadgeProps
} from './components/CommunityBadge.svelte';

// Pricing / waitlist
export {
default as PricingCard,
PricingTier,
PricingAmount,
PricingBlurb,
PricingFeatures,
PricingFlag,
PricingCTA,
type PricingCardProps
} from './components/PricingCard.svelte';
export {
default as BeforeAfter,
BeforeAfterBefore,
BeforeAfterAfter,
BeforeAfterArrow,
type BeforeAfterProps
} from './components/BeforeAfter.svelte';
export { default as WaitlistForm, type WaitlistFormProps } from './components/WaitlistForm.svelte';
export { default as Popover, type PopoverProps } from './components/Popover.svelte';

// Hooks (escape hatches for headless usage)
export {
useTypewriter,
type UseTypewriterOptions,
type UseTypewriterResult
} from './hooks/useTypewriter.svelte';
export { useCounter, type UseCounterOptions } from './hooks/useCounter.svelte';
export {
useTokenStream,
type UseTokenStreamOptions,
type UseTokenStreamResult
} from './hooks/useTokenStream.svelte';
export { useAsciiField, type UseAsciiFieldOptions } from './hooks/useAsciiField.svelte';

// Utilities
export { cn, type ClassValue } from './utils/cn';
