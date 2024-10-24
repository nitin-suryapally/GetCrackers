import { useProductContext } from "@/context/ProductContext";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const Categories = () => {
    const { filterByCategory, filteredProducts } = useProductContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Default to "all"
  
    const categories = [
      { label: "Flower Pots", value: "flower-pots" },
      { label: "Chakkars", value: "chakkars" },
      { label: "Rockets", value: "rockets" },
      { label: "Bombs", value: "bombs" },
      { label: "Twinkling Stars", value: "twinkling-stars" },
      { label: "Sparkles", value: "sparkles" },
      { label: "Wala", value: "wala" },
      { label: "Shots", value: "shots" },
      { label: "Bijili", value: "bijili" },
      { label: "Fancy", value: "fancy" },
      { label: "All", value: "all" },
    ];
  
    const handleCategorySelect = (category: string) => {
      setSelectedCategory(category); // Update selected category
      filterByCategory(category); // Trigger filtering in context
      console.log(filteredProducts)
      setIsDropdownOpen(false); // Close dropdown
    };
  
    return (
      <div className="relative flex-shrink-0 ">
        <button
          className="flex items-center text-black dark:text-white focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Categories
          <ChevronDownIcon
            className={`ml-1 h-5 w-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
  
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg z-10 transition-all duration-300 transform opacity-100 scale-100 origin-top-right"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <ul className="text-black dark:text-white p-4">
              {categories.map((category) => (
                <li
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  className={`hover:bg-gray-200 dark:hover:bg-neutral-700 p-2 border-b-[1px] border-gray-400 cursor-pointer ${
                    selectedCategory === category.value
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : ""
                  }`}
                >
                  {category.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default Categories;
  