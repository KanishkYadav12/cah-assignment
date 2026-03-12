import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BuySection from "@/components/BuySection";

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="bg-black px-5 py-16 text-center">
          <h1 className="text-5xl font-black text-white">Shop</h1>
        </div>
        <BuySection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}