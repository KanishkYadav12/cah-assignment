import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cards Against Humanity is a party game for horrible people, made by a small team in Chicago.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-[700px]">
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05]">
            A party game for horrible people.
          </h1>
          <p className="text-gray-400">
            Cards Against Humanity was created by a group of friends from
            Highland Park High School as a party game for New Year&apos;s Eve.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white px-6 py-16 text-black">
        <div className="mx-auto max-w-[700px]">
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Our Story</h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>
              Cards Against Humanity started as a Kickstarter project in 2011
              and has since become the best-selling toy or game on Amazon.
              It&apos;s a simple game: each round, one player asks a question
              from a black card, and everyone else answers with their funniest
              white card.
            </p>
            <p>
              We&apos;re a small, independent company based in Chicago. We
              don&apos;t have a parent company or investors, and we make every
              decision ourselves. We try to be bold, take risks, and make
              people laugh.
            </p>
            <p>
              Cards Against Humanity is distributed under a{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black underline"
              >
                Creative Commons BY-NC-SA 4.0 license
              </a>
              , which means you can use and remix the game for free, but you
              can&apos;t sell it without our permission.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white px-6 pb-16 text-black">
        <div className="mx-auto max-w-[700px]">
          <hr className="mb-16 border-gray-300" />
          <h2 className="mb-6 text-2xl font-black md:text-3xl">What We Do</h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>
              We make the world&apos;s most popular party game and a bunch of
              other stuff. Over the years, we&apos;ve raised money for
              charity, purchased land on the US–Mexico border to impede the
              construction of a border wall, dug a pointless hole in the
              ground, and mailed real people 30,000 pounds of bull feces.
            </p>
            <p>
              We like to think of ourselves as a game company that occasionally
              does stunts, or a stunt company that occasionally makes games.
            </p>
          </div>
        </div>
      </section>

      {/* Our Games */}
      <section className="bg-white px-6 pb-16 text-black">
        <div className="mx-auto max-w-[700px]">
          <hr className="mb-16 border-gray-300" />
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Our Games</h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>
              In addition to the original Cards Against Humanity, we sell a
              Family Edition (safe for kids aged 8 and up), dozens of expansion
              packs and themed $5 packs, and other games and products.
            </p>
            <p>
              Our products are available on our{" "}
              <Link href="/shop" className="font-black underline">
                online store
              </Link>
              , Amazon, Target, and other retailers around the world.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/shop" className="btn-primary inline-block px-8 py-3">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white px-6 pb-20 text-black">
        <div className="mx-auto max-w-[700px]">
          <hr className="mb-16 border-gray-300" />
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Contact Us</h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>
              Take a deep breath. Contemplate the transience of all things.
            </p>
            <p>
              Then email us at{" "}
              <a
                href="mailto:Mail@CardsAgainstHumanity.com"
                className="font-black underline"
              >
                Mail@CardsAgainstHumanity.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}