"use client";

import { cancel } from "@/app/_actions/payment";
import { useTransition } from "react";
import { Button } from "./Button";

type Props = {
  subscriptionId: string;
};

export function CancelPaymentButton({ subscriptionId }: Props) {
  const [isPending, transision] = useTransition();

  const handleClick = () => {
    transision(async () => {
      try {
        await cancel(subscriptionId);
      } catch {
        alert("Failed to cancel the subscription");
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      Cancel
    </Button>
  );
}
