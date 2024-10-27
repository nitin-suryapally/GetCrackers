"use client";
import { useEffect, useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import Popup from "./Popup";


interface ProductGridProps {
  defaultProducts: any[];
}

export default function ProductGrid({ defaultProducts }: ProductGridProps) {
  const { filteredProducts, products } = useProductContext();
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setDisplayProducts(filteredProducts);
    } else if (products.length > 0) {
      setDisplayProducts(products);
    } else {
      setDisplayProducts(defaultProducts);
    }

    if (filteredProducts.length === 0 && products.length > 0 && hasInteracted) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [filteredProducts, products, defaultProducts, hasInteracted]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <Popup
          message="No products found for the selected category or search term. Displaying all products."
          onClose={closePopup}
        />
      )}
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto"
        style={{ maxHeight: "80vh" }}
      >
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => <ProductCard product={product} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </>
  );
}
