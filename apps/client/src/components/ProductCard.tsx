"use client";
import React, { useState } from "react";
import { ProductType } from "@repo/types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });

  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  return (
    <div className="hover:shadow-xl hover:scale-101 rounded-lg overflow-hidden transition-all duration-200">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3">
          <Image
            src={
              (product.images as Record<string, string>)?.[
                productTypes.color
              ] || ""
            }
            alt={product.name}
            fill
            className="object-cover hover:scale-103 transition-all duration-200"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="font-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES - Row layout */}
        <div className="flex items-center justify-between py-1">
          {/* COLORS */}
          <div className="flex items-center gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  handleProductType({ type: "color", value: color })
                }
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  productTypes.color === color
                    ? "ring-2 ring-neutral-900 ring-offset-2"
                    : "ring-1 ring-neutral-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* SIZE DROPDOWN  */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-neutral-400 font-bold">
              Size
            </span>
            <select
              name="size"
              id="size"
              className="bg-transparent text-sm font-bold text-neutral-900 focus:outline-none cursor-pointer appearance-none border-b border-transparent hover:border-neutral-900 transition-colors"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
