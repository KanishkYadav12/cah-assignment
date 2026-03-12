import Image from "next/image";

interface StealData {
  title?: string;
  description?: string;
  note?: string;
  buttonOneText?: string;
  buttonTwoText?: string;
}

export default function StealSection({ data }: { data?: StealData }) {
  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-8 text-[28px] font-extrabold text-black md:mb-12 md:text-[42px]">
          {data?.title || "Steal the game."}
        </h2>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Left: Text + Buttons */}
          <div className="max-w-[550px] flex-1">
            <p className="mb-4 text-[15px] leading-[1.7] text-black/80 md:text-[17px]">
              {data?.description ||
                "Since day one, Cards Against Humanity has been available as a free download on our website. You can download the PDFs and printing instructions right here\u2014all you need is a printer, scissors, and a prehensile appendage."}
            </p>
            <p className="mb-8 text-[13px] leading-relaxed text-[#999999] md:text-[14px]">
              {data?.note ||
                "Please note: there\u2019s no legal way to use these PDFs to make money, so don\u2019t ask."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="btn-red px-6 py-3"
              >
                {data?.buttonOneText || "DOWNLOAD FILES"}
              </a>
              <a
                href="#"
                className="btn-red px-6 py-3"
              >
                {data?.buttonTwoText || "DOWNLOAD"}
              </a>
            </div>
          </div>

          {/* Right: Badge + Arrow */}
          <div className="relative flex shrink-0 items-center justify-center md:w-[280px]">
            <Image
              src="https://www.cardsagainsthumanity.com/images/steal-badge.svg"
              alt="Free download badge"
              width={200}
              height={200}
              className="h-auto w-[180px] md:w-[200px]"
            />
            <Image
              src="https://www.cardsagainsthumanity.com/images/steal-arrow.svg"
              alt="Arrow"
              width={140}
              height={110}
              className="absolute -bottom-6 -left-6 h-auto w-[130px] md:w-[140px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}