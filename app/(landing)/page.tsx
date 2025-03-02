import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return(
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn programming languages from start to end on Codeepedia!
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" variant="teal" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="tealOutline" className="w-full">
                  I already have an account!
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="teal" className="w-full" asChild>
                <Link href="/learn">Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
