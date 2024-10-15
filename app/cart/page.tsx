"use client";
import React, { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useProductContext();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const submitOrder = async () => {
    if (!customerName || !phoneNumber) {
      alert("Please enter both your name and phone number");
      return;
    }

    const order = {
      _type: "order",
      customerName,
      phoneNumber,
      cartItems: cart.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
    const apiToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN as string;

    try {
      const response = await fetch(
        `https://${projectId}.api.sanity.io/v1/data/mutate/production`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: order,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create document in Sanity");
      }

      const data = await response.json();
      setOrderSubmitted(true);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Error submitting order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">Thank you! Your order has been submitted.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-400 rounded text-black font-medium text=lg"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border border-gray-800 rounded-lg shadow-md transition duration-300 hover:border-blue-300 hover:shadow-lg overflow-hidden p-4 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={urlFor(item.images[0]).url()}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                  <p className="text-sm text-white/80">
                    <strong>Company:</strong> {item.company}
                  </p>
                  <p className="text-sm text-white/80">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    <strong>Price:</strong> ₹{item.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-400 rounded text-black font-bold text=lg"
                      onClick={() =>
                        updateCartQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-4 py-2 bg-blue-400 rounded text-black font-bold text=lg"
                      onClick={() =>
                        updateCartQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <div className="mt-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={submitOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </>
      )}
    </div>
  );
}
