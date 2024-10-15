"use client";
import { useProductContext } from "@/context/ProductContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, cart } = useProductContext();

  return (
    <div className="border border-gray-800 rounded-lg shadow-md overflow-hidden p-4 flex flex-col transition duration-300 hover:border-blue-300 hover:shadow-lg">
      {product.images[0] && (
        <div className="relative h-48 w-full overflow-hidden rounded-md">
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      )}

      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-sm text-white/80 mt-2 line-clamp-3">
          {product.description}
        </p>

        <p className="text-sm text-white/80 mt-2">
          Company: <span className="font-medium">{product.company}</span>
        </p>

        <p className="text-sm text-white/80">
          Category: <span className="font-medium">{product.category}</span>
        </p>

        <p className="text-lg font-bold text-blue-600 mt-2">
          ₹{product.price.toFixed(2)}
        </p>
      </div>

      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        onClick={() => {
          console.log("Adding to Cart: ", product);
          addToCart({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            company: product.company,
            slug: product.slug,
            images: product.images,
            quantity: 1,
          });

          console.log(cart);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
