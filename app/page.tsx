import { AccordionComponent } from "@/components/homepage/accordion-component";
import BlogSample from "@/components/homepage/blog-samples";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import Pricing from "@/components/homepage/pricing";
import SideBySide from "@/components/homepage/side-by-side";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import TestimonialSection from "@/components/homepage/testimonial-section";
import PainPointsSection from "@/components/homepage/pain-points-section";
import HowItWorks from "@/components/homepage/how-it-works";
import MakerWall from "@/components/homepage/maker-wall";
import BoostCTA from "@/components/homepage/boost-cta";
import MarkdownSection from "@/components/homepage/markdown-section";


export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3 space-y-24">
        <HeroSection />
        <MarkdownSection />
        <TestimonialSection />
        <SideBySide />
        <HowItWorks />
        <PainPointsSection />
      </div>
      {config.auth.enabled && config.payments.enabled && (
        <div>
          <Pricing />
        </div>
      )}
      <AccordionComponent />
      <MakerWall />
      <BoostCTA />
    </PageWrapper>
  );
}
