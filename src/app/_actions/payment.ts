"use server";

import { options } from "@/app/_clients/nextAuth";
import { prisma } from "@/app/_clients/prisma";
import { stripe } from "@/app/_clients/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function checkout() {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("session not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user?.stripeCustomerId) {
    throw new Error("user not found");
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      // create your items
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    automatic_tax: { enabled: true },
    customer: user.stripeCustomerId,
    customer_update: {
      // for automatic_tax
      shipping: "auto",
    },
    shipping_address_collection: {
      // for automatic_tax
      allowed_countries: ["JP"],
    },
    success_url:
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
  });

  if (!checkoutSession.url) {
    throw new Error("checkoutSession.url not found");
  }

  redirect(checkoutSession.url);
}

export async function cancel(id: string) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("session not found");
  }

  if (!session.user.isPaid) {
    throw new Error("user is not active");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user?.stripeCustomerId) {
    throw new Error("user not found");
  }

  const subscription = await stripe.subscriptions.cancel(id);

  if (subscription.status === "canceled") {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isPaid: false,
      },
    });
  }

  redirect("/");
}

export async function status() {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("session not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user?.stripeCustomerId) {
    throw new Error("user not found");
  }

  return await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
  });
}
