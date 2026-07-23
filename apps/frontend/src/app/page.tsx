import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyTradeOXX } from "@/components/sections/WhyTradeOXX";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeatureShowcase />
      <ProductPreview />
      <WhyTradeOXX />
      <HowItWorks />
      <PricingPreview />
      <FAQSection />
    </>
  );
}
