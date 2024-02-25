import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { options } from "../_clients/nextAuth";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(options);

  if (!session?.user) {
    return notFound();
  }

  return <>{children}</>;
}
