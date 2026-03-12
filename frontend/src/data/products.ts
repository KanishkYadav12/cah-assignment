import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "cards-against-humanity",
    slug: "cards-against-humanity",
    name: "Cards Against Humanity",
    tagline: "America's #1 gerbil coffin.",
    price: 29,
    images: [
      "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png",
    ],
    description:
      "Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
    bullets: [
      "Comes with 600 cards.",
      "The Original. The Classic. The One That Started It All.",
      "Ages 17+. Not for children.",
    ],
    featured: true,
    category: "main",
    bgColor: "#B5E5F5",
    ctaLabel: "Buy Now",
  },
  {
    id: "family-edition",
    slug: "family-edition",
    name: "Cards Against Humanity: Family Edition",
    tagline: "Play CAH with your kids.",
    price: 29,
    images: [
      "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png",
    ],
    description:
      "Cards Against Humanity: Family Edition is a whole new game that's just as funny as the original, but written so kids and adults can play together.",
    bullets: [
      "Designed for kids ages 8 and up.",
      "A whole new game — not just a censored version of the original.",
      "600 cards, endless replay value.",
    ],
    featured: true,
    category: "main",
    bgColor: "#FFE600",
    ctaLabel: "Buy Family Edition",
  },
  {
    id: "more-cah",
    slug: "more-cah",
    name: "More Cards Against Humanity",
    tagline: "Moooooore cards!",
    price: 25,
    images: [
      "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png",
    ],
    description:
      "More Cards Against Humanity comes with 600 expansion cards that instantly double the replayability and girth of your deck.",
    bullets: [
      "If you've never bought an expansion and you want more Cards Against Humanity, buy More Cards Against Humanity.",
      "It's got all the best jokes from our old Red Box, Blue Box, and Green Box expansions, plus 50 cards we've never printed before.",
      "Shiny!",
    ],
    featured: true,
    category: "expansion",
    bgColor: "#FFB2D1",
    ctaLabel: "Buy Now",
  },
  {
    id: "five-dollar-packs",
    slug: "five-dollar-packs",
    name: "$5 Packs",
    tagline: "For whatever you're into.",
    price: 5,
    images: [
      "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png",
    ],
    description:
      "Dozens of themed mini-packs, each with 30 cards about a specific topic.",
    bullets: [
      "30 cards per pack.",
      "Dozens of themes to choose from.",
      "Mix and match with any CAH game.",
    ],
    featured: true,
    category: "pack",
    bgColor: "#FFA552",
    ctaLabel: "Buy Now",
  },
  {
    id: "tales-vol-1",
    slug: "tales-vol-1",
    name: "Tales Vol. 1",
    tagline: "A book of fill-in-the-blank stories.",
    price: 19.99,
    images: [
      "https://img.cah.io/images/vc07edlh/production/5de43bd46e3aca7e0dbbe441a5f27de1bb041cda-1401x1261.png",
    ],
    description:
      "A book of fill-in-the-blank stories to play with your CAH cards.",
    bullets: [
      "Play with your existing CAH cards.",
      "Hilarious stories for game night.",
      "Great for groups of any size.",
    ],
    featured: false,
    category: "other",
  },
  {
    id: "shit-list",
    slug: "shit-list",
    name: "Shit List",
    tagline: "A fresh way to play CAH.",
    price: 22.99,
    images: [
      "https://img.cah.io/images/vc07edlh/production/06e90cda6bff2b7f23e2998f3c0a18451649fc94-1400x1261.png",
    ],
    description:
      "A fresh way to play CAH where YOU write the answers, plus 80 black cards.",
    bullets: [
      "80 new black cards.",
      "Write-in answer format.",
      "A completely new way to play.",
    ],
    featured: false,
    category: "other",
  },
];

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3) {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
