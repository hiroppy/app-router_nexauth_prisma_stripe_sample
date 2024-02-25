"use client";

import { checkout } from "@/app/_actions/payment";
import { useTransition } from "react";
import { Button } from "./Button";

export function CheckoutPaymentButton() {
  const [isPending, transision] = useTransition();

  const handleClick = () => {
    transision(async () => {
      try {
        await checkout();
      } catch {
        alert("Failed to checkout");
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      PAY
    </Button>
  );
}
