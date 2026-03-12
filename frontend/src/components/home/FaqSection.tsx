"use client";

import { useState } from "react";
import { faqs as defaultFaqs } from "@/data/faqs";
import type { Faq } from "@/types";

export default function FaqSection({ cmsFaqs }: { cmsFaqs?: Faq[] }) {
  const items = cmsFaqs && cmsFaqs.length > 0 ? cmsFaqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-20 text-black">
      <div className="mx-auto max-w-[800px]">
        <h2 className="mb-10 text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.1]">
          Frequently Asked Questions
        </h2>
        {items.map((faq, i) => (
          <div key={i} className="border-t-2 border-black">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between bg-transparent py-5 text-left text-base font-black"
            >
              <span>{faq.question}</span>
              <span className="ml-4 text-xl leading-none">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="pb-5 text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        <div className="border-t-2 border-black" />
      </div>
    </section>
  );
}
