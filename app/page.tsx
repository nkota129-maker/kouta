import { Hero } from "@/components/home/Hero";
import { BonusGrid } from "@/components/home/BonusGrid";
import { GeneratorCTA } from "@/components/home/GeneratorCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BonusGrid />
      <GeneratorCTA />
    </>
  );
}
