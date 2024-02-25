"use client";

import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { Button } from "./Button";

export function SignOutButton() {
  const [isPending, transision] = useTransition();

  const handleClick = () => {
    transision(async () => {
      try {
        await signOut();
      } catch {
        alert("Failed to sign out");
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      Sign out
    </Button>
  );
}
