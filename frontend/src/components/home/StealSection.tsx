"use client";

export default function StealSection() {
  return (
    <section className="bg-white px-6 py-24 text-black md:px-10 md:py-32">
      <div className="mx-auto max-w-[900px]">
        {/* Header with starburst */}
        <div className="mb-10 flex items-start justify-between">
          <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95]">
            Steal the game.
          </h2>
          <div className="relative ml-6 hidden flex-shrink-0 md:block">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#a8f0c6] text-center">
              <span className="text-sm font-black leading-tight text-black">
                Free!<br />Download<br />now!
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[750px] space-y-6">
          <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] leading-[1.5]">
            Since day one, Cards Against Humanity has been available as{" "}
            <a href="#" className="underline">
              a free download on our website
            </a>
            . You can download the PDFs and printing instructions right
            here&mdash;all you need is a printer, scissors, and a prehensile
            appendage.
          </p>
          <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] leading-[1.5]">
            Please note: there&apos;s no legal way to use these PDFs to make
            money, so don&apos;t ask.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="relative">
            <span className="inline-block rounded-lg bg-[#FF6B6B] px-5 py-2 text-sm font-bold text-white">
              Download: Click here!
            </span>
            <svg
              className="ml-1 inline-block text-[#FF6B6B]"
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="currentColor"
            >
              <path d="M0 10 L30 10 L25 5 M30 10 L25 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <a
            href="#"
            className="btn-primary px-8 py-3 text-base"
          >
            Download Files
          </a>
        </div>
      </div>
    </section>
  );
}
