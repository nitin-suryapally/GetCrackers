"use client";
import { useProductContext } from "@/context/ProductContext";
import { useState } from "react";

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
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
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

    // Show notification and auto-hide after 2 seconds
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="relative flex-1">
      <button
        className="py-2 px-4 bg-red-500 text-white rounded shadow-lg hover:bg-red-700 hover:shadow-2xl transition-all duration-300 ease-in-out w-full"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300 ease-in-out z-50">
          {product.name} added to cart!
        </div>
      )}
    </div>
  );
}
