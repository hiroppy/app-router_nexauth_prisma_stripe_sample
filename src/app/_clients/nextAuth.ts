import { prisma } from "@/app/_clients/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { stripe } from "./stripe";

export const options: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
          isPaid: profile.isPaid ?? false,
        };
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      if (user.email) {
        const customer = await stripe.customers.create({
          name: user.name ?? "-",
          email: user.email,
        });

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }
    },
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
    session: async ({ session, token, user, trigger, newSession }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.isPaid = user.role === "admin" || user.isPaid;
      }

      return session;
    },
  },
};
