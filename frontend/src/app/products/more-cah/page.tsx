import { getProducts, getFooter } from "@/lib/cms";
import MoreCAHClient from "./MoreCAHClient";

export default async function MoreCAHPage() {
  const products = await getProducts()
  const footer = await getFooter()
  
  const mainProduct = products.find((p: any) => p.slug === "more-cah") || null
  const related = products.filter((p: any) => p.slug !== "more-cah").slice(0, 3)

  return <MoreCAHClient product={mainProduct} related={related} footer={footer} />
}