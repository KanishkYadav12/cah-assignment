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
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-12 text-4xl font-bold text-black">
          {data?.title || "Steal the game."}
        </h2>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[600px] flex-1">
            <p className="mb-6 text-lg leading-relaxed text-black">
              {data?.description || "Since day one, Cards Against Humanity has been available as a free download on our website. You can download the PDFs and printing instructions right here—all you need is a printer, scissors, and a prehensile appendage."}
            </p>
            <p className="mb-8 text-sm text-gray-600">
              {data?.note || "Please note: there's no legal way to use these PDFs to make money, so don't ask."}
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-[#FF0000] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80">
                {data?.buttonOneText || "Download Files"}
              </a>
              <a href="#" className="bg-[#FF0000] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80">
                {data?.buttonTwoText || "Download"}
              </a>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center justify-center md:w-[300px]">
            <Image
              src="https://www.cardsagainsthumanity.com/images/steal-badge.svg"
              alt="Free download badge"
              width={200}
              height={200}
              className="h-auto w-[200px]"
            />
            <Image
              src="https://www.cardsagainsthumanity.com/images/steal-arrow.svg"
              alt="Arrow"
              width={150}
              height={120}
              className="absolute -bottom-4 -left-4 h-auto w-[150px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}