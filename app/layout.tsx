import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner"
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";

const font = Sora({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Codeepedia - Learn to Code",
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
          <Toaster/>
          <HeartsModal/>
          <ExitModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
