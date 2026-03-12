"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { shopLinks, infoLinks, socialLinks } from "@/data/navigation";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-black px-8 pb-8 pt-16 text-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Shop */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest">
              Shop
            </h3>
            <ul className="space-y-2">
              {shopLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Info */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest">
              Info
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Find Us */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest">
              Find Us
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Email */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest">
              Email List
            </h3>
            <p className="mb-3 text-xs text-gray-400">
              Sign up and we&apos;ll let you know first when we do anything:
            </p>
            <div className="flex overflow-hidden rounded-full border border-gray-600">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder-gray-500"
              />
              <button className="bg-white px-4 py-2 text-sm font-black text-black">
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col flex-wrap items-center justify-between gap-4 border-t border-gray-700 pt-6 md:flex-row">
          <Image
            src="https://www.cardsagainsthumanity.com/images/logo-footer.svg"
            alt="Cards Against Humanity"
            width={120}
            height={28}
            className="invert"
          />
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>&copy;{new Date().getFullYear()} Cards Against Humanity LLC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
