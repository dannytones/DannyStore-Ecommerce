import React from "react";
import { ProductsType, ProductType } from "@repo/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import { ArrowRight } from "lucide-react";

const fetchData = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`,
  );
  const data: ProductType[] = await res.json();
  return data;
};

const ProductList = async ({
  category,
  sort,
  search,
  params,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const products = await fetchData({ category, sort, search, params });
  return (
    <div className="w-full ">
      <Categories />
      <div className="flex items-baseline justify-between py-6 border-neutral-100">
        {params === "homepage" && (
          <Link
            href={category ? `/products/?category=${category}` : "/products"}
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900 transition-colors">
              View all Products
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400 transform group-hover:translate-x-1 group-hover:text-neutral-900 transition-all duration-300" />
          </Link>
        )}
        {params === "products" && <Filter />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
