"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  cart: CartItem[];
  setProducts: (products: Product[]) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
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
  const [cart, setCart] = useState<CartItem[] | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

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

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart?.filter((item) => item._id !== id) || []);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(
      (prevCart) =>
        prevCart?.map((item) =>
          item._id === id ? { ...item, quantity: quantity } : item
        ) || []
    );
  };

  if (cart === null) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        setProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
