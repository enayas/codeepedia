import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs';

const font = Sora({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Codepedia - Learn to Code",
  description: "Learn how to code from start to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className= {font.className}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
