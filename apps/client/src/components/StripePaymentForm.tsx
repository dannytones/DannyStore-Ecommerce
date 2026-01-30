"use client";
import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(
  "pk_test_51Suq9vDQS4phHdHvTrbEWFKS3l7Aqk0iCme26hAXAEOc8EBWT1UyX3JDHDHYCH5vFpw08pBbiW8BsRQjgOxb2spB00nsiN4vLk",
);

const fetchClientSecret = async (token: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Сервер повернув помилку:", errorText);
    throw new Error(`Server error: ${response.status}`);
  }

  const json = await response.json();
  return json.checkoutSessionClientSecret;
};

const StripePaymentForm = () => {
  const [token, setToken] = useState<string | null>("");
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, [getToken]);

  if (!token) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ clientSecret: fetchClientSecret(token) }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
