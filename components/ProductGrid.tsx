"use client";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  defaultProducts: any[];
}

export default function ProductGrid({ defaultProducts }: ProductGridProps) {
  const { products } = useProductContext();

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {displayProducts.length > 0 ? (
        displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}
