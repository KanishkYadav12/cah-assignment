import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="bg-black px-5 py-16 text-center">
          <h1 className="text-5xl font-black text-white">About</h1>
        </div>
        <section className="mx-auto max-w-[800px] px-5 py-20">
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Cards Against Humanity is available for free under a Creative Commons license. You can download and print it yourself, or buy a physical copy from our store.
          </p>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}