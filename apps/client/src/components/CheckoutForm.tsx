"use client";
import React, { useState } from "react";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { ShippingFormInputs } from "@repo/types";
import { ConfirmError } from "@stripe/stripe-js";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkoutState = useCheckout();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);
    if (checkoutState.type === "success") {
      const { updateEmail, updateShippingAddress, confirm } =
        checkoutState.checkout;
      await updateEmail(shippingForm.email);
      await updateShippingAddress({
        name: "shipping_adress",
        address: {
          line1: shippingForm.adress,
          city: shippingForm.city,
          country: "US",
        },
      });
      const res = await confirm();
      if (res.type === "error") {
        console.error(res.error.message);
        setError(res.error);
        setLoading(false);
      } else {
        console.log("Payment was Succesfull!", res.session);
      }
    }
  };

  switch (checkoutState.type) {
    case "loading":
      return <div>Loading ...</div>;
    case "error":
      return <div>Error: {checkoutState.error.message}</div>;
    case "success":
      return (
        <form>
          <PaymentElement options={{ layout: "accordion" }} />
          <button disabled={loading} onClick={handleClick}>
            {loading ? "loading..." : "Pay"}
          </button>
        </form>
      );
  }
};
export default CheckoutForm;
