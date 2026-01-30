"use client";
import ShippingForm from "@/components/ShippingForm";
import { ShippingFormInputs } from "@repo/types";
import useCartStore from "@/stores/cartSore";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import StripePaymentForm from "@/components/StripePaymentForm";
const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Adress",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const activeSteps = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart } = useCartStore();

  // MATH//////////////////////////////////////////////////////
  const getSubtotal = (): number => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const getDiscount = (): number => {
    return getSubtotal() * 0.1;
  };
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = 10;
  const total = subtotal - discount + shipping;
  //////////////////////////////////////////////////////////

  // MAIN
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your shoping cart</h1>
      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeSteps ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full p-4 flex items-center justify-center ${
                step.id === activeSteps
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeSteps ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS AND DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-200 p-8 rounded-lg flex flex-col gap-8">
          {activeSteps === 1 ? (
            cart.map((item) => (
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={
                        (item.images as Record<string, string>)?.[
                          item.selectedColor
                        ] || ""
                      }
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-200 text-red-400 flex items-center justify-center cursor-pointer "
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : activeSteps === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeSteps === 3 && shippingForm ? (
            <StripePaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the Shipping Adress
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-200 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Detaild</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$ {discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$ {shipping.toFixed(2)}</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">${total.toFixed(2)}</p>
            </div>
          </div>
          <div className="">
            {activeSteps === 1 && (
              <button
                onClick={() => router.push("/cart?step=2", { scroll: false })}
                className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-200 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
