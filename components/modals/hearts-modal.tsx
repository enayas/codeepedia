"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {isOpen, close} = useHeartsModal();

  useEffect(()=> setIsClient(true), []);

  const onClick = () => {
    close()
    router.push("/learn");
  };

  if(!isClient) {
    return null;
  }

  return(
    <Dialog open={isOpen} onOpenChange={close} >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80}/>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts, please come back tomorrow!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Pro version for unlimited hearts is coming soon...
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button variant="tealOutline" className="w-full" size="lg" onClick={onClick}>
              Return to Homepage
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};