import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "WestTRACK",
  description: "Your Transactions Made Easier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body>
            {children}
            </body>
        </html>
    </ClerkProvider>
  );
}
