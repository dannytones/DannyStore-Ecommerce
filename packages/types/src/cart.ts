import type { Product } from "@repo/product-db";
import z from "zod";

export type CartItemType = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be beetween 7 and 9 digits")
    .max(10, "Phone number cannot be more than 10 digits")
    .regex(/^\d+$/, "phone number must contain only numbers!"),
  adress: z.string().min(1, "Adress is required"),
  city: z.string().min(1, "City is required"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
