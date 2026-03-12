import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import GameDescription from "@/components/home/GameDescription";
import ProductGrid from "@/components/home/ProductGrid";
import StealSection from "@/components/home/StealSection";
import StuffSection from "@/components/home/StuffSection";
import FaqSection from "@/components/home/FaqSection";
import EmailSignup from "@/components/home/EmailSignup";

export const metadata: Metadata = {
  title: "Cards Against Humanity — A party game for horrible people.",
  description:
    "A fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun!",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GameDescription />
      <ProductGrid />
      <StealSection />
      <StuffSection />
      <FaqSection />
      <EmailSignup />
    </>
  );
}