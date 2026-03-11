"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink { label: string; url: string; }
interface FooterData {
  copyright?: string;
  shopLinks?: FooterLink[];
  infoLinks?: FooterLink[];
  socialLinks?: FooterLink[];
}

const fallbackShopLinks = [
  { label: "All Products", url: "/shop/all" },
  { label: "Main Games", url: "/shop/main-games" },
  { label: "Expansions", url: "/shop/expansions" },
  { label: "Packs", url: "/shop/packs" },
];

const fallbackInfoLinks = [
  { label: "About", url: "/about" },
  { label: "Support", url: "/support" },
  { label: "Contact", url: "/contact" },
];

const fallbackSocialLinks = [
  { label: "Instagram", url: "https://instagram.com/cardsagainsthumanity" },
  { label: "Facebook", url: "https://www.facebook.com/CardsAgainstHumanity" },
];

export default function Footer({ data }: { data?: FooterData }) {
  const [email, setEmail] = useState("");
  const shopLinks = data?.shopLinks?.length ? data.shopLinks : fallbackShopLinks;
  const infoLinks = data?.infoLinks?.length ? data.infoLinks : fallbackInfoLinks;
  const socialLinks = data?.socialLinks?.length ? data.socialLinks : fallbackSocialLinks;

  return (
    <footer className="bg-black px-5 py-16 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Shop</h3>
            <ul className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.url} className="text-sm text-white hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Info</h3>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.url} className="text-sm text-white hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Find Us</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Email List</h3>
            <p className="mb-4 text-sm text-gray-300">Sign up and we'll let you know first when we do anything:</p>
            <div className="flex flex-col gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border border-white bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-400" />
              <button className="bg-white px-4 py-2 text-sm font-bold uppercase text-black hover:opacity-80">Submit</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <Image src="https://www.cardsagainsthumanity.com/images/logo-footer.svg" alt="Cards Against Humanity" width={180} height={30} className="h-auto w-[150px]" />
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/terms" className="text-white hover:underline">Terms of Use</Link>
              <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
              <Link href="/submission-terms" className="text-white hover:underline">Submission Terms</Link>
            </div>
            <span className="text-sm text-gray-400">{data?.copyright || "©2026 Cards Against Humanity LLC"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}