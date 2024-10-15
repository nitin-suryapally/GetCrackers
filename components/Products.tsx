import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductGrid from "./ProductGrid";

export const revalidate = 10;

export default async function ProductsPage() {
  const fetchedProducts = await client.fetch(groq`*[_type=="product"]`);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <ProductGrid defaultProducts={fetchedProducts} />
    </div>
  );
}
