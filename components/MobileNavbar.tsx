"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useProductContext } from "@/context/ProductContext";
import Categories from "./Categories";
import Search, { SearchSkeleton } from "./Search";

const MobileNavbar = () => {
  const { cart } = useProductContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="relative flex items-center justify-between p-4 w-full lg:px-6 bg-black  shadow-md mx-auto md:hidden">
        <div className="flex w-full items-center justify-between space-x-8">
          {/* Hamburger Icon for Sidebar */}
          <button onClick={toggleSidebar} className="md:hidden">
            <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
          </button>

          {/* Search Icon */}
          <div className="flex items-center">
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
      </nav>

      {/* Sidebar for Logo and Categories */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-black  shadow-md transform z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Close Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="self-end p-4 text-black dark:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Sidebar Content: Logo and Categories */}
          <div className="px-4 py-4">
            <Link href="/" prefetch={true} className="flex items-center mb-6">
              <div className="ml-2 text-lg font-medium uppercase text-white">
                GetCrackers
              </div>
            </Link>

            {/* Categories */}
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
