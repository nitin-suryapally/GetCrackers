"use client";
import { useProductContext } from "@/context/ProductContext";

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    company: string;
    slug: any;
    images: any[];
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useProductContext();

  return (
    <button
      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 ease-in-out w-full"
      onClick={() => {
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

        // Trigger an alert when the item is added to the cart
        window.alert(`${product.name} has been added to your cart!`);
      }}
    >
      Add to Cart
    </button>
  );
}
