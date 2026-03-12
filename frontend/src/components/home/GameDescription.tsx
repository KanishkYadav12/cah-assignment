"use client";

export default function GameDescription() {
  return (
    <section className="relative bg-white px-6 py-24 text-black md:py-32">
      {/* Decorative icons scattered around */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <span className="absolute left-[3%] top-[40%] text-4xl">&#9752;</span>
        <span className="absolute right-[5%] top-[35%] text-3xl">&#128172;</span>
        <span className="absolute bottom-[15%] left-[10%] text-3xl">&#10052;</span>
        <span className="absolute bottom-[20%] right-[15%] text-3xl">&#9986;</span>
        <span className="absolute right-[30%] top-[10%] text-3xl">&#128190;</span>
        <span className="absolute bottom-[10%] left-[30%] text-3xl">&#127916;</span>
      </div>

      <div className="relative z-10 mx-auto max-w-[800px]">
        <p className="mb-8 text-[clamp(1.5rem,3.5vw,2.2rem)] font-normal leading-[1.4]">
          <strong className="font-black">Cards Against Humanity</strong> is a
          fill-in-the-blank party game that turns your awkward personality and
          lackluster social skills into hours of fun! Wow.
        </p>
        <p className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-normal leading-[1.4]">
          The game is simple. Each round, one player asks a question from a
          black card, and everyone else answers with their funniest white card.
        </p>
      </div>
    </section>
  );
}
