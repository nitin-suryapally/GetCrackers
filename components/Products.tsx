import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductGrid from "./ProductGrid";

export const revalidate = 10;

export default async function ProductsPage() {
  const fetchedProducts = await client.fetch(groq`*[_type=="product"]`);

  return (
    <div className="container mx-auto p-4">
     
      <ProductGrid defaultProducts={fetchedProducts} />
    </div>
  );
}
