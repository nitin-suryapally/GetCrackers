import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  company: string;
  slug: { current: string };
  images: { asset: { _ref: string } }[]; // Sanity image field structure
  videoLink?: string; // Optional video link
}

export interface ProductDetailProps {
  params: { slug: string };
}
// Fetch product details by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  const product = await client.fetch(query, { slug });

  return product || null; // Return null if the product is not found
}
