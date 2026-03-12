"use client";

const campaigns = [
  {
    tag: "BLACK FRIDAY 2018",
    tagColor: "#FF0044",
    title: "Holy fuck we had some deals.",
    titleColor: "#FF0044",
    bgColor: "#FFE600",
    image: null,
  },
  {
    tag: "SCIENCE SCHOLARSHIP",
    tagColor: "#6B3FA0",
    title: "A full-tuition scholarship for women.",
    titleColor: "#6B3FA0",
    bgColor: "#E8D5F5",
    image: null,
  },
  {
    tag: "HOLIDAY HOLE",
    tagColor: "#DAA520",
    title: "You paid us to dig a big hole in the ground.",
    titleColor: "#DAA520",
    bgColor: "#2962FF",
    image: null,
  },
];

export default function StuffSection() {
  return (
    <section className="bg-black px-6 pb-8 pt-12 md:px-10">
      {/* Heading */}
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none text-white">
          Stuff we&apos;ve done.
        </h2>
        <div className="relative ml-4 hidden flex-shrink-0 md:block">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-center">
            <span className="text-[10px] font-black leading-tight text-black">
              More to<br />come!
            </span>
          </div>
        </div>
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className="flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl p-6 md:min-h-[500px]"
            style={{ backgroundColor: c.bgColor }}
          >
            <div>
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: c.tagColor }}
              >
                {c.tag}
              </span>
              <h3
                className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-tight"
                style={{ color: c.titleColor }}
              >
                {c.title}
              </h3>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <span style={{ color: c.tagColor }} className="text-sm font-bold">
                Read
              </span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs"
                style={{ borderColor: c.tagColor, color: c.tagColor }}
              >
                &#8599;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
