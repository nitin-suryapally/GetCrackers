"use client";
import Link from "next/link";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProductContext } from "@/context/ProductContext";
import Categories from "./Categories";
import Companies from "./Companies";

const Navbar = () => {
  const { cart } = useProductContext();

  return (
    <nav className="relative flex items-center justify-between p-4 w-full lg:px-6 bg-white dark:bg-neutral-900 shadow-md mx-auto">
      {/* Navbar content for large screens */}
      <div className="flex w-full items-center justify-between space-x-8">
        {/* Logo - Visible only on large screens */}
        <div className="flex-shrink-0 hidden md:block">
          <Link href="/" prefetch={true} className="flex items-center">
            <div className="ml-2 text-lg font-medium uppercase md:text-2xl text-white">
              GetCrackers
            </div>
          </Link>
        </div>

        {/* Categories - Visible only on large screens */}
        <div className="hidden md:block">
          <Categories />
        </div>
        <div className="hidden md:block">
          <Companies />
        </div>

        {/* Search bar - Visible on large screens */}
        <div className="flex-grow hidden sm:flex items-center justify-center sm:w-1/3 lg:w-1/2 xl:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* Shopping Cart */}
        <div className="flex-shrink-0">
          <Link href="/cart" className="relative flex items-center">
            <ShoppingCartIcon className="h-6 w-6 text-black dark:text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar (visible below `md`) */}
      <div className="block sm:hidden w-full mt-4">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;
