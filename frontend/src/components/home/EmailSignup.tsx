"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-white px-6 py-24 text-center text-black md:py-32">
      <div className="mx-auto max-w-[700px]">
        <p className="mb-10 text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.15]">
          To find out first when we sell a car for $97, put your email address
          in this box:
        </p>
        {submitted ? (
          <p className="text-xl font-black">Thanks for signing up!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md overflow-hidden rounded-full border-2 border-black"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent px-5 py-3 text-base text-black outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-black px-6 py-3 font-black text-white transition hover:bg-gray-800"
            >
              Go
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
