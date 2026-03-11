"use client";

import { useState } from "react";
import Image from "next/image";

export default function EmailSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="bg-[#F5F5F5] px-5 py-20">
      <div className="mx-auto flex max-w-[500px] flex-col items-center text-center">
        <Image
          src="https://img.cah.io/images/vc07edlh/production/6d7d67943605f882af1c5c779e5e77f7c23bb6a4-86x86.svg"
          alt="Email icon"
          width={60}
          height={60}
          className="mb-6 h-[60px] w-[60px]"
        />

        <h2 className="mb-6 max-w-[500px] text-2xl font-bold text-black">
          To find out first when we release new stuff, give us your email:
        </h2>

        <form onSubmit={handleSubmit} className="mb-4 flex w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 border border-black px-4 py-3 text-base text-black outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-[#FF0000] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-500">
          We&apos;ll only email you like twice a year and we won&apos;t share
          your info with anybody else.
        </p>
      </div>
    </section>
  );
}
