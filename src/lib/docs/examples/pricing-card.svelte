<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import PricingCard, {
	PricingAmount,
	PricingBlurb,
	PricingCTA,
	PricingFeatures,
	PricingFlag,
	PricingTier
} from '$lib/components/PricingCard.svelte';
</script>

<Example
title="Three tiers"
code={`<PricingCard featured>
  <PricingCard.Flag>Most popular</PricingCard.Flag>
  <PricingCard.Tier>Pro</PricingCard.Tier>
  <PricingCard.Amount unit="/mo">$49</PricingCard.Amount>
  <PricingCard.Blurb>For the serious solo builder.</PricingCard.Blurb>
  <PricingCard.Features>
    <li>1M tokens / day</li>
    <li>Priority routing</li>
  </PricingCard.Features>
  <PricingCard.CTA href="/upgrade">Upgrade</PricingCard.CTA>
</PricingCard>`}
>
<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;width:100%">
<PricingCard>
<PricingTier>Hobby</PricingTier>
<PricingAmount unit="/mo">$0</PricingAmount>
<PricingBlurb>For weekend experiments.</PricingBlurb>
<PricingFeatures>
<li>10K tokens / day</li>
<li>Community support</li>
</PricingFeatures>
<PricingCTA href="#">Start free</PricingCTA>
</PricingCard>
<PricingCard featured>
<PricingFlag>Most popular</PricingFlag>
<PricingTier>Pro</PricingTier>
<PricingAmount unit="/mo">$49</PricingAmount>
<PricingBlurb>For the serious solo builder.</PricingBlurb>
<PricingFeatures>
<li>1M tokens / day</li>
<li>Priority routing</li>
<li>Unlimited projects</li>
</PricingFeatures>
<PricingCTA href="#">Upgrade</PricingCTA>
</PricingCard>
<PricingCard>
<PricingTier>Enterprise</PricingTier>
<PricingAmount>Custom</PricingAmount>
<PricingBlurb>For teams who say "leverage" a lot.</PricingBlurb>
<PricingFeatures>
<li>VPC deploy</li>
<li>SOC 2 / HIPAA</li>
</PricingFeatures>
<PricingCTA href="#">Talk to sales</PricingCTA>
</PricingCard>
</div>
</Example>
