"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  // console.log(product);
  const productName = product.name || "Unnamed Product";
  const productPrice =
    product.price != null
      ? `₹${product.price.toFixed(2)}`
      : "Price not available";
  const productImageUrl =
    product.images && product.images[0]
      ? urlFor(product.images[0]).url()
      : "/default-placeholder.png";
  return (
    <div className="border border-gray-800 rounded-lg shadow-md overflow-hidden p-4 flex flex-col transition duration-300 hover:border-blue-300 hover:shadow-lg h-full">
      <div className="relative h-56 w-full overflow-hidden rounded-md">
        <Image
          src={productImageUrl}
          alt={productName}
          width={300}
          height={450}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-semibold text-white">{productName}</h3>
        <p className="text-lg font-bold text-blue-600 mt-2">{productPrice}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          <Link href={`product/${product.slug.current}`}>View Product</Link>
        </button>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
