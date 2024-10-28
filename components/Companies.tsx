import { useProductContext } from "@/context/ProductContext";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

interface CompaniesProps {
  onCompanySelect?: () => void;
}

const Companies = ({ onCompanySelect }: CompaniesProps) => {
  const { filterByCompany } = useProductContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");

  const companies = [
    { label: "Standard", value: "standard" },
    { label: "Coronation", value: "coronation" },
    { label: "Ayyans", value: "ayyans" },
    { label: "Others", value: "others" },
  ];

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
    filterByCompany(company);
    setIsDropdownOpen(false);

    // Close sidebar if `onCompanySelect` is provided
    if (onCompanySelect) onCompanySelect();
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        className="flex items-center text-black dark:text-white focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Companies
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
            {companies.map((company) => (
              <li
                key={company.value}
                onClick={() => handleCompanySelect(company.value)}
              >
                <Link
                  href={`/company/${company.value}`}
                  className={`block hover:bg-gray-200 dark:hover:bg-neutral-700 p-2 border-b-[1px] border-gray-400 cursor-pointer ${
                    selectedCompany === company.value
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : ""
                  }`}
                >
                  {company.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Companies;
