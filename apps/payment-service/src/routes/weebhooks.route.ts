import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const webhookRoute = new Hono();

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!);
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`);
    return c.json({ message: "Webhook signature verification failed" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Full Session:", JSON.stringify(session));

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      //   TODO: CREATE OREDER
      producer.send("payment.successful", {
        value: {
          userId: session.client_reference_id,
          email: session.customer_details?.email,
          amount: session.amount_total,
          status: session.payment_status === "paid" ? "success" : "failed",
          address: {
            city: session.customer_details?.address?.city,
            country: session.customer_details?.address?.country,
            line1: session.customer_details?.address?.line1,
            line2: session.customer_details?.address?.line2,
            postal_code: session.customer_details?.address?.postal_code,
          },
          products: lineItems.data.map((item) => ({
            name: item.description,
            quantity: item.quantity,
            price: item.price?.unit_amount,
          })),
        },
      });

      break;

    default:
      break;
  }

  return c.json({ received: true });
});

export default webhookRoute;
