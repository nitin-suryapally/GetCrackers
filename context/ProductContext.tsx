"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

// Product and Cart types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  company: string;
  slug: { current: string };
  images: any[];
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  setProducts: (products: Product[]) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  filterByCategory: (category: string) => void;
  searchProducts: (searchTerm: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Default to 'all'

  // Fetch products from Sanity on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.fetch(groq`*[_type=="product"]`);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts); // Initially, show all products
    };
    fetchProducts();
  }, []);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart?.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        return prevCart?.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ) as CartItem[];
      } else {
        return [...(prevCart || []), { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart?.filter((item) => item._id !== id) || []);
  };

  // Update the quantity of a product in the cart
  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(
      (prevCart) =>
        prevCart?.map((item) =>
          item._id === id ? { ...item, quantity: quantity } : item
        ) || []
    );
  };

  // Handle category selection
  const filterByCategory = (category: string) => {
    setSelectedCategory(category); // Update the selected category
  };

  // Effect to filter products based on selectedCategory
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]); // Dependency on selectedCategory and products

  // Search products by name
  const searchProducts = (searchTerm: string) => {
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  if (cart === null) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        setProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        filterByCategory,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
