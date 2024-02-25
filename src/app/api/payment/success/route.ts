import { options } from "@/app/_clients/nextAuth";
import { prisma } from "@/app/_clients/prisma";
import { stripe } from "@/app/_clients/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ message: "invalid" }, { status: 401 });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ message: "invalid" }, { status: 400 });
  }

  try {
    const paymentInfo = await stripe.checkout.sessions.retrieve(sessionId);

    if (paymentInfo.status === "complete") {
      await prisma.$transaction(async (prisma) => {
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            isPaid: true,
          },
        });
      });

      redirect("/");
    } else {
      // It is better to create an error page to notify the frontend of the error.
      redirect("/subscription");
    }
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
