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
    <section className="bg-black px-5 py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <Image
          src="https://www.cardsagainsthumanity.com/images/logo-hero.svg"
          alt="Cards Against Humanity Logo"
          width={300}
          height={90}
          priority
          className="mb-10 w-[300px]"
        />
        <h1 className="mb-6 text-5xl font-black text-white md:text-8xl">
          {data?.heading || "Cards Against Humanity"}
        </h1>
        <p className="mb-10 text-xl italic text-[#FF0000]">
          &ldquo;{data?.quoteOne || "Bad."}&rdquo; &mdash; {data?.quoteOneSource || "NPR"}
        </p>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {suitIcons.map((icon, i) => (
            <Image key={i} src={icon} alt="Card suit icon" width={38} height={38} />
          ))}
        </div>
        <p className="mx-auto mb-10 max-w-[600px] text-center text-lg leading-relaxed text-white">
          {data?.description || "Cards Against Humanity is a fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun! Wow."}
        </p>
        <p className="text-xl italic text-[#FF0000]">
          &ldquo;{data?.quoteTwo || "Stupid."}&rdquo; &mdash; {data?.quoteTwoSource || "Bloomberg"}
        </p>
      </div>
    </section>
  );
}