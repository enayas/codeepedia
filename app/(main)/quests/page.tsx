import Image from "next/image";
import {redirect} from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress } from "@/db/queries";
import { UserProgress } from "@/components/user-progress";
import { Progress } from "@/components/ui/progress";

const quests = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 200 XP",
    value: 200,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
];

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  // const userSubscriptionData = getUserSubscription();

  const [
    userProgress
    // userSubscription
  ] = await Promise.all([
    userProgressData,
    // userSubscriptionData
  ]);

  if (!userProgress || !userProgress.activeCourse){
    redirect("/courses");
  }

  // const isPro = !!userSubscription.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false} // todo :change to real value
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/quests.svg"
            alt="Quests"
            height={90}
            width={90}
          />
        </div>
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          Quests
        </h1>
        <p className="text-center font-bold text-neutral-800 text-2xl my-6">
          Complete quests by earning star points!
        </p>
        <ul className="w-full">
          {quests.map((quest) => {
            const progress = (userProgress.points/quest.value)*100;
            return(
              <div className="flex items-center w-full p-4 gap-x-4"
              key={quest.title}>
                <Image 
                  src="/points.svg"
                  alt="Points"
                  height={60}
                  width={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-neutral-700 text-xl font-bold">
                    {quest.title}
                  </p>
                  <Progress
                    value={progress}
                    className="h-3"
                  />
                </div>
              </div>
            )
          })}
        </ul>
      </FeedWrapper>
    </div>
  )
}

export default QuestsPage;