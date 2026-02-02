"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import useCartStore from "@/stores/cartSore";

const stripe = loadStripe(
  "pk_test_51Suq9vDQS4phHdHvTrbEWFKS3l7Aqk0iCme26hAXAEOc8EBWT1UyX3JDHDHYCH5vFpw08pBbiW8BsRQjgOxb2spB00nsiN4vLk",
);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Додаємо стейт для секрету
  console.log("User loaded:", isLoaded, "User exists:", !!user);

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  console.log("TOKEN STRIPE PAYMENT:", token);

  useEffect(() => {
    if (token && cart.length > 0) {
      fetchClientSecret(cart, token).then(setClientSecret);
    }
  }, [token, cart]);

  if (!token || !clientSecret) {
    return <div>Initializing secure connection...</div>;
  }
  return (
    <CheckoutProvider
      stripe={stripe}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
