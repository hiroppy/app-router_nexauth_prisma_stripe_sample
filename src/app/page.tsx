import { getServerSession } from "next-auth";
import Link from "next/link";
import { PropsWithChildren, Suspense } from "react";
import { status } from "./_actions/payment";
import { options } from "./_clients/nextAuth";
import { CancelPaymentButton } from "./_components/CancelPaymentButton";
import { SignInButton } from "./_components/SignInButton";
import { SignOutButton } from "./_components/SignoutButton";

export default async function Page() {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-gray-300">
        {session?.user
          ? `you are signed in as ${session.user.name} 😄`
          : "you are not signed in 🥲"}
      </p>
      <hr className="divide-x-2" />
      {!session?.user ? <SignInButton /> : <SignOutButton />}
      <Section title="For logged in users">
        <Link href="/free-page">👉 free page</Link>
        <Link href="/subscription">
          👉 subscription page to visit for the paid page
        </Link>
      </Section>
      <Section title="For paid users">
        <Link href="/paid-page">👉 paid page</Link>
      </Section>
      <Section title="Payment status">
        {session?.user.isPaid ? (
          <Suspense fallback={<p>Loading...</p>}>
            <PaymentStatus />
          </Suspense>
        ) : (
          <p>You haven't paid yet 🥲</p>
        )}
      </Section>
    </div>
  );
}

async function PaymentStatus() {
  const { data } = await status();

  return (
    <div className="space-y-4">
      {data.map(({ id, start_date, status }) => (
        <div key={id}>
          <div className="flex gap-10 items-center">
            <p className="text-sm">{id}</p>
            <CancelPaymentButton subscriptionId={id} />
          </div>
          <div className="ml-4 mt-2">
            <p>start_date: {new Date(start_date * 1000).toLocaleString()}</p>
            <p>status: {status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="ml-5 flex flex-col gap-4 text-gray-300">{children}</div>
    </section>
  );
}
