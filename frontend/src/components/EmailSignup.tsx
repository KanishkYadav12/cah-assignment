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
    <section className="bg-[#F5F5F5] px-5 py-14 md:py-20">
      <div className="mx-auto flex max-w-[460px] flex-col items-center text-center">
        <Image
          src="https://img.cah.io/images/vc07edlh/production/6d7d67943605f882af1c5c779e5e77f7c23bb6a4-86x86.svg"
          alt=""
          width={48}
          height={48}
          className="mb-5 h-[48px] w-[48px]"
        />

        <h2 className="mb-6 text-[18px] font-extrabold leading-snug text-black md:text-[22px]">
          To find out first when we release new stuff, give us your email:
        </h2>

        <form onSubmit={handleSubmit} className="mb-4 flex w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 border border-black/20 bg-white px-4 py-3 text-[14px] text-black outline-none placeholder:text-black/30 focus:border-black/50"
          />
          <button
            type="submit"
            className="btn-red px-6 py-3"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-[12px] leading-relaxed text-black/40">
          We&apos;ll only email you like twice a year and we won&apos;t share
          your info with anybody else.
        </p>
      </div>
    </section>
  );
}
