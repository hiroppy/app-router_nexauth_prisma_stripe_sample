import { options } from "@/app/_clients/nextAuth";
import { CheckoutPaymentButton } from "@/app/_components/CheckoutPaymentButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(options);

  return (
    <div className="flex items-center justify-center gap-6 flex-col">
      {session?.user.isPaid ? (
        <>
          <p>You've already paid, thanks!</p>
          <p>
            You can access{" "}
            <Link href="/paid-page" className="text-blue-300">
              the paid page
            </Link>{" "}
            !
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold text-center leading-10">
            Do you want to pay to visit the paid page?
          </p>
          <CheckoutPaymentButton />
        </>
      )}
    </div>
  );
}
