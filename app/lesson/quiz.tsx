"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Percent } from "lucide-react";
import { useState } from "react";
import { Header } from "./header";

type Props = {
  initialPercentage:number;
  initialHearts:number;
  initialLessonId:number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed:boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
  userSubscription:any; // TODO: Replace type
}

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}:Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setpercentage] = useState(initialPercentage);
  

  return(
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}

      />
    </>
  );
};