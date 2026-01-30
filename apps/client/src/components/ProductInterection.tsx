"use client";
import React, { useState } from "react";
import { ProductType } from "@repo/types";
import { string } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartSore";
import { toast } from "react-toastify";

const ProductInterection = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };
  return (
    <div className="flex flex-col gap-4 mt-4 ">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border p-0.5 ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-8 h-8 text-center flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-2 rounded-full ${
                selectedColor === color ? "border-black" : "border-gray-300"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className={`w-5 h-5 rounded-full`}
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* QUANTI */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg/20 transition-all duration-200 text-sm font-medium"
      >
        <Plus className="" />
        Add to Cart
      </button>
      <button className="ring ring-gray-400 text-gray-800 px-4 py-2 rounded-md  flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg/20 transition-all duration-200 text-sm font-medium">
        <ShoppingCart className="" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInterection;
