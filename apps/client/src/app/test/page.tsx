import { auth } from "@clerk/nextjs/server";
import React from "react";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  console.log(token);

  // PRODUCT TEST
  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();
  console.log(dataProduct);

  // ORDER TEST
  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();
  console.log(dataOrder);

  // PAYMENT TEST
  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();
  console.log(dataPayment);

  return <div>TestPage</div>;
};

export default TestPage;
