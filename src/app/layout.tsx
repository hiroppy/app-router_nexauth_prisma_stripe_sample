import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: "stripe example!",
  description: "😸",
};

export const viewport: Viewport = {
  // for mobile
  maximumScale: 1,
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={[
          inter.className,
          "bg-gray-700 text-gray-200 h-screen flex flex-col",
          // for dialog
          "has-[dialog[open]]:overflow-hidden",
        ].join(" ")}
      >
        <main className="py-4 px-8 h-full flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
