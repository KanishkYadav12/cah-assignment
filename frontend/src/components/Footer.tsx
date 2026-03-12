"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  url: string;
}
interface FooterData {
  copyright?: string;
  shopLinks?: FooterLink[];
  infoLinks?: FooterLink[];
  socialLinks?: FooterLink[];
}

const fallbackShopLinks: FooterLink[] = [
  { label: "All Products", url: "/shop" },
  { label: "Main Games", url: "/shop" },
  { label: "Expansions", url: "/shop" },
  { label: "Packs", url: "/shop" },
];

const fallbackInfoLinks: FooterLink[] = [
  { label: "About", url: "/about" },
  { label: "Support", url: "/about" },
  { label: "Contact", url: "/about" },
];

const fallbackSocialLinks: FooterLink[] = [
  { label: "Instagram", url: "https://instagram.com/cardsagainsthumanity" },
  { label: "Facebook", url: "https://www.facebook.com/CardsAgainstHumanity" },
  { label: "X / Twitter", url: "https://x.com/CAH" },
];

export default function Footer({ data }: { data?: FooterData }) {
  const [email, setEmail] = useState("");
  const shopLinks =
    data?.shopLinks?.length ? data.shopLinks : fallbackShopLinks;
  const infoLinks =
    data?.infoLinks?.length ? data.infoLinks : fallbackInfoLinks;
  const socialLinks =
    data?.socialLinks?.length ? data.socialLinks : fallbackSocialLinks;

  return (
    <footer className="bg-black px-5 py-12 text-white md:py-16">
      <div className="mx-auto max-w-[1000px]">
        {/* 4-column grid */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:mb-16 md:grid-cols-4 md:gap-10">
          {/* Shop */}
          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60">
              Shop
            </h3>
            <ul className="flex flex-col gap-[8px]">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60">
              Info
            </h3>
            <ul className="flex flex-col gap-[8px]">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60">
              Find Us
            </h3>
            <ul className="flex flex-col gap-[8px]">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Email List */}
          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60">
              Email List
            </h3>
            <p className="mb-3 text-[13px] leading-relaxed text-white/50">
              Sign up and we&apos;ll let you know first when we do anything:
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="border border-white/20 bg-transparent px-3 py-2 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-white/50"
              />
              <button className="bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
            <Image
              src="https://www.cardsagainsthumanity.com/images/logo-footer.svg"
              alt="Cards Against Humanity"
              width={150}
              height={25}
              className="h-auto w-[120px] opacity-60 md:w-[140px]"
            />
            <div className="flex flex-wrap justify-center gap-4 text-[12px]">
              <Link
                href="/terms"
                className="text-white/40 transition-colors hover:text-white/70"
              >
                Terms of Use
              </Link>
              <Link
                href="/privacy"
                className="text-white/40 transition-colors hover:text-white/70"
              >
                Privacy Policy
              </Link>
              <Link
                href="/submission-terms"
                className="text-white/40 transition-colors hover:text-white/70"
              >
                Submission Terms
              </Link>
            </div>
            <span className="text-[12px] text-white/30">
              {data?.copyright || "\u00A9 2026 Cards Against Humanity LLC"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}