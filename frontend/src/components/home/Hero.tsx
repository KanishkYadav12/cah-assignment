"use client";

import Image from "next/image";

const cards = [
  { src: "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png", alt: "CAH box", w: 180, h: 340, style: { top: "5%", left: "52%", transform: "rotate(-8deg)" }, type: "white" as const },
  { src: "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png", alt: "Family Edition", w: 160, h: 300, style: { top: "15%", left: "72%", transform: "rotate(5deg)" }, type: "white" as const },
  { src: "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png", alt: "More CAH", w: 150, h: 280, style: { top: "35%", left: "40%", transform: "rotate(-3deg)" }, type: "black" as const },
  { src: "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png", alt: "$5 Packs", w: 140, h: 260, style: { top: "50%", left: "60%", transform: "rotate(8deg)" }, type: "white" as const },
  { src: "https://img.cah.io/images/vc07edlh/production/5de43bd46e3aca7e0dbbe441a5f27de1bb041cda-1401x1261.png", alt: "Tales", w: 160, h: 160, style: { top: "55%", left: "25%", transform: "rotate(-12deg)" }, type: "white" as const },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black">
      {/* Scattered cards */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute"
            style={card.style}
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={card.w}
              height={card.h}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Title - bottom left like the real site */}
      <div className="relative z-10 flex min-h-[90vh] flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <h1 className="max-w-[500px] text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] text-white">
          Cards<br />Against<br />Humanity
        </h1>

        {/* Quote */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-3xl">&#127810;</span>
          <div>
            <span className="text-2xl font-black text-white md:text-3xl">
              &ldquo;Hysterical.&rdquo;
            </span>
            <span className="ml-2 text-sm font-bold tracking-widest text-white">
              TIME
            </span>
          </div>
          <span className="text-3xl">&#127810;</span>
        </div>
      </div>
    </section>
  );
}
