"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const fallbackFAQs: FAQItem[] = [
  {
    question: "Where can I buy Cards Against Humanity?",
    answer:
      "Our products are available all over the place, such as our webstore, Amazon, and at all of these retailers.",
  },
  {
    question: "Can I still buy it even if I'm not in America?",
    answer:
      "We make localized versions for Canada, Australia, and the UK, plus a special International Edition.",
  },
  {
    question: "How do I play Cards Against Humanity?",
    answer:
      "Each round, one player asks a question with a black card, and everyone else answers with their funniest white card.",
  },
  {
    question: "Do you sell expansions?",
    answer:
      "Yes! We sell large boxed expansions and dozens of small themed packs.",
  },
  {
    question: "I bought something from you and now there's a problem.",
    answer:
      "Go to our webstore FAQ, and if that doesn't help, send us an email at Mail@CardsAgainstHumanity.com",
  },
];

export default function FAQSection({ data }: { data?: FAQItem[] }) {
  const faqs = data && data.length > 0 ? data : fallbackFAQs;
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const expandAll = () => setOpenIndexes(new Set(faqs.map((_, i) => i)));

  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-8 text-[28px] font-extrabold text-black md:mb-12 md:text-[42px]">
          Your dumb questions.
        </h2>
        <div className="divide-y divide-gray-200 border-b border-t border-gray-200">
          {faqs.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-4 text-[15px] font-bold text-black md:text-[17px]">
                  {item.question}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center text-xl font-light text-black transition-transform duration-200 ${
                    openIndexes.has(index) ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndexes.has(index)
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-[15px] leading-relaxed text-[#666666]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={expandAll}
          className="btn-red mt-8 px-8 py-3"
        >
          EXPAND ALL
        </button>
      </div>
    </section>
  );
}