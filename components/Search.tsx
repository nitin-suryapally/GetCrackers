"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { groq } from "next-sanity";
import { useProductContext } from "@/context/ProductContext";

export default function Search() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams?.get("q") || "");
  const { setProducts } = useProductContext();
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        searchProducts(query);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchProducts = async (searchQuery: string) => {
    setLoading(true);
    setNoResults(false);

    const searchQueryGroq = groq`*[_type == "product" && name match "${searchQuery}*"] {
      _id,
      name,
      description,
      price,
      category,
      company,
      slug,
      images
    }`;

    const products = await client.fetch(searchQueryGroq);
    setProducts(products);
    setLoading(false);

    if (products.length === 0) {
      setNoResults(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchProducts(query);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:w-64 md:w-full lg:w-80 xl:w-96"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          autoComplete="off"
          className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <button type="submit">
            <MagnifyingGlassIcon className="h-4" />
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full sm:w-64 md:w-full lg:w-80 xl:w-96">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
