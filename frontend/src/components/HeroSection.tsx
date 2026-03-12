import Image from "next/image";

const suitIcons = [
  "https://img.cah.io/images/vc07edlh/production/410d7640a35a6d1c6b1c5532a8865ce9566f7aef-38x38.svg",
  "https://img.cah.io/images/vc07edlh/production/7755ab953426b92bcee84da84db54d73c90fdb82-38x36.svg",
  "https://img.cah.io/images/vc07edlh/production/844969c83be9f4736138e20b1f5160624c32b27d-38x37.svg",
  "https://img.cah.io/images/vc07edlh/production/4e31f1365aac66e92504f15c4b0dc6fed6c35467-37x37.svg",
  "https://img.cah.io/images/vc07edlh/production/99b5ad3a812bbfd8b22aa17a2e2b09ed714007ec-38x38.svg",
  "https://img.cah.io/images/vc07edlh/production/c3ad2ad955dc7d6d78dab0538a95c326ba540e3b-38x38.svg",
  "https://img.cah.io/images/vc07edlh/production/2b4022e0540298d890c5c014a48962dda608b599-37x37.svg",
  "https://img.cah.io/images/vc07edlh/production/5c65c30fc763b717a6aeb4e3e31396dc1eff25cb-37x37.svg",
  "https://img.cah.io/images/vc07edlh/production/dcd9c155e28ce85538e4ee426bdac4c189e4bd3f-38x36.svg",
];

interface HeroData {
  heading?: string;
  description?: string;
  quoteOne?: string;
  quoteOneSource?: string;
  quoteTwo?: string;
  quoteTwoSource?: string;
}

export default function HeroSection({ data }: { data?: HeroData }) {
  return (
    <section className="bg-black px-5 pb-14 pt-16 md:pb-20 md:pt-24">
      <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
        {/* Hero Logo */}
        <Image
          src="https://www.cardsagainsthumanity.com/images/logo-hero.svg"
          alt="Cards Against Humanity"
          width={500}
          height={120}
          priority
          fetchPriority="high"
          className="mb-10 w-[300px] md:w-[460px]"
        />

        {/* Description */}
        <p className="mb-10 max-w-[520px] text-[16px] leading-[1.7] text-white/90 md:text-[18px]">
          {data?.description ||
            "Cards Against Humanity is a fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun! Wow."}
        </p>

        {/* Press Quotes */}
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-[15px] italic text-[#FF0000] md:text-[16px]">
            &ldquo;{data?.quoteOne || "Absurd."}&rdquo;{" "}
            <span className="not-italic text-[#FF0000]/80">
              &mdash; {data?.quoteOneSource || "The New York Times"}
            </span>
          </p>
          <p className="text-[15px] italic text-[#FF0000] md:text-[16px]">
            &ldquo;{data?.quoteTwo || "A game for horrible people."}&rdquo;{" "}
            <span className="not-italic text-[#FF0000]/80">
              &mdash; {data?.quoteTwoSource || "Bloomberg Businessweek"}
            </span>
          </p>
        </div>

        {/* Suit Icons */}
        <div className="flex flex-wrap items-center justify-center gap-[10px]">
          {suitIcons.map((icon, i) => (
            <Image
              key={i}
              src={icon}
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] opacity-60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}