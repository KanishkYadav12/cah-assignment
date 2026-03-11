import Image from "next/image";
import Link from "next/link";

interface Product {
  id?: string;
  name?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  images?: { imageUrl: string; alt?: string }[];
}

const fallbackProducts = [
  {
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png" }, { imageUrl: "https://img.cah.io/images/vc07edlh/production/63e9bcc5935e9cae00a4a9594d3637d89608c443-660x1270.png" }],
    tagline: "America's #1 gerbil coffin.",
    buttonText: "Buy Now",
    buttonLink: "/products/cards-against-humanity",
  },
  {
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png" }],
    tagline: "Play CAH with your kids.",
    buttonText: "Buy Family Edition",
    buttonLink: "/products/family-edition",
  },
  {
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png" }, { imageUrl: "https://img.cah.io/images/vc07edlh/production/e92ecce7e13c7339aa9bb54f7909e1cd9f7a8cd2-660x1200.png" }],
    tagline: "Moooooore cards!",
    buttonText: "Buy Expansions",
    buttonLink: "/shop/expansions",
  },
  {
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png" }, { imageUrl: "https://img.cah.io/images/vc07edlh/production/83bdf2fb8ba74ceca463163373d12d9ff432230b-660x1200.png" }],
    tagline: "For whatever you're into.",
    buttonText: "Buy $5 Packs",
    buttonLink: "/shop/packs",
  },
];

export default function BuySection({ data }: { data?: Product[] }) {
  const products = data && data.length > 0 ? data : fallbackProducts;

  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-16 text-4xl font-bold text-black">Buy the game.</h2>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-5 flex max-h-[400px] items-center justify-center gap-2 overflow-hidden">
                {(product.images || []).map((img, i) => (
                  <Image
                    key={i}
                    src={img.imageUrl}
                    alt={product.tagline || "Product"}
                    width={330}
                    height={635}
                    className="max-h-[350px] w-auto object-contain"
                  />
                ))}
              </div>
              <p className="mb-4 text-lg font-medium text-black">
                {product.tagline}
              </p>
              <Link
                href={product.buttonLink || "#"}
                className="block w-full bg-[#FF0000] py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
              >
                {product.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}