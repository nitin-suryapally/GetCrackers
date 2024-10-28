"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic route parameters
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Product } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

const CompanyPage = () => {
  const { companySlug } = useParams(); // Extract companySlug directly from the URL path
  const [companyProducts, setCompanyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (companySlug) {
      const fetchCompanyProducts = async () => {
        setLoading(true);
        setNoResults(false);

        try {
          // Fetch products based on company name (companySlug)
          const products = await client.fetch(
            groq`*[_type == "product" && company == $companySlug] {
              _id,
              name,
              description,
              price,
              category,
              company,
              slug,
              images
            }`,
            { companySlug }
          );

          setCompanyProducts(products);
          if (products.length === 0) setNoResults(true);
        } catch (error) {
          console.error("Error fetching company products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCompanyProducts();
    }
  }, [companySlug]);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Products for {companySlug || ""}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : noResults ? (
        <p className="text-center text-gray-500">
          No products found for this company.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {companyProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CompanyPage;
