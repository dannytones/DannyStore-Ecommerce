"use client";
import React, { useState } from "react";
import { ProductType } from "@repo/types";
import { string } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
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
    <div className="flex flex-col gap-8 mt-6 font-sans">
      {/* SIZE SELECTION */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">
          Size
        </span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleTypeChange("size", size)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                selectedSize === size
                  ? "bg-neutral-900 text-white shadow-md shadow-neutral-200"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* COLOR SELECTION */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">
          Color
        </span>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleTypeChange("color", color)}
              className={`relative w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center ${
                selectedColor === color
                  ? "ring-1 ring-neutral-900 ring-offset-2 scale-110"
                  : "hover:scale-105"
              }`}
            >
              <div
                className="w-full h-full rounded-full border border-neutral-200"
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY & ACTIONS */}
      <div className="flex flex-col gap-5 pt-2">
        <div className="flex items-center justify-between bg-neutral-100 p-1.5 rounded-2xl w-fit">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-neutral-900 hover:text-white transition-all active:scale-90 text-neutral-600"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="w-10 text-center text-xs font-bold tabular-nums text-neutral-900">
            {quantity}
          </span>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-neutral-900 hover:text-white transition-all active:scale-90 text-neutral-600"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        {/* BUTTONS */}
        <button
          onClick={handleAddToCart}
          className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg/20 transition-all duration-200 text-sm font-medium"
        >
          <Plus className="" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInterection;
