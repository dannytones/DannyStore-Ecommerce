import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { PaymentFormInputs, paymentFormSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();
  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {};
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      {/* CARDHOLDER */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-sm text-gray-500 font-medium"
        >
          Card Holder
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardHolder"
          placeholder="Enter receivers Card Holder name... "
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      {/* cardNumber */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-sm text-gray-500 font-medium"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardNumber"
          placeholder="Enter card number... "
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      {/* Expirational Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="expirationalDate"
          className="text-sm text-gray-500 font-medium"
        >
          Expirational Date
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="expirationalDate"
          placeholder="Enter expirational date... "
          {...register("expirationalDate")}
        />
        {errors.expirationalDate && (
          <p className="text-xs text-red-500">
            {errors.expirationalDate.message}
          </p>
        )}
      </div>
      {/* CVV */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-sm text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cvv"
          placeholder="Enter cvv... "
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      {/* City */}
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm text-gray-500 font-medium">
          City
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="city"
          placeholder="Enter city... "
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/klarna.png"
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-200 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Checkout
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default PaymentForm;
