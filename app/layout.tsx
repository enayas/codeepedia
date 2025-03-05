import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner"
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import Script from "next/script";

const font = Sora({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Codeepedia - Learn to Code",
  description: "Learn how to code from start to end. It's easy, fun, and free!",
  keywords: "Codeepedia, codeepedia, codepedia, Codepedia, learn to code, how to code, programming basics, learn how to program, learn programming",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    

      <html lang="en">
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-JF22HT3JDZ`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics" strategy="afterInteractive"
          >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JF22HT3JDZ');
          `}
          </Script>
        </head>

     
          <body
          className= {font.className}
          >
          <Toaster/>
          <HeartsModal/>
          <ExitModal />
          <ClerkProvider>   
          {children}
          </ClerkProvider>
        </body>

      </html>

  );
}
