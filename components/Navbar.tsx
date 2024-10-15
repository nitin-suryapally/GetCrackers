"use client";
import Link from "next/link";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProductContext } from "@/context/ProductContext";

const Navbar = () => {
  const { cart } = useProductContext();

  return (
    <nav className="relative flex items-center justify-between p-4 w-full lg:px-6 bg-white dark:bg-neutral-900 shadow-md max-w-7xl mx-auto">
      <div className="flex w-full items-center justify-between">
        <div className="hidden sm:flex">
          <Link href="/" prefetch={true} className="flex items-center">
            <div className="ml-2 text-sm font-medium uppercase md:text-2xl">
              GetCrackers
            </div>
          </Link>
        </div>

        <div className="flex  w-full sm:w-1/3  lg:w-1/2 xl:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        <div className="flex justify-end items-center space-x-4">
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
    </nav>
  );
};

export default Navbar;
