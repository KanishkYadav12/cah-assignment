import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BuySection from "@/components/BuySection";
import StealSection from "@/components/StealSection";
import FAQSection from "@/components/FAQSection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getHero, getProducts, getFAQs, getStealSection, getFooter } from "@/lib/cms";

export default async function HomePage() {
  const hero = await getHero();
  const products = await getProducts();
  const faqs = await getFAQs();
  const steal = await getStealSection();
  const footer = await getFooter();

  return (
    <main>
      <Navbar />
      <HeroSection data={hero ?? undefined} />
      <BuySection data={products.length > 0 ? products : undefined} />
      <StealSection data={steal ?? undefined} />
      <FAQSection data={faqs.length > 0 ? faqs : undefined} />
      <EmailSignup />
      <Footer data={footer ?? undefined} />
      <CartDrawer />
    </main>
  );
}