"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Percent } from "lucide-react";
import { useState, useTransition } from "react";
import { useWindowSize} from "react-use";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModal } from "@/store/use-hearts-modal";

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
  const {open: openHeartsModal} = useHeartsModal();
  const { width, height} = useWindowSize();
  const router = useRouter();
  const [finishAudio] = useAudio({src: "/finish.mp3", autoPlay:true});
  const [
    correctAudio,
    _c,
    correctControls,
  ] = useAudio({src: "/correct.wav"});
  const [
    incorrectAudio,
    _i,
    incorrectControls,
  ] = useAudio({src: "/incorrect.wav"});
  const [pending, startTransition] = useTransition();

  const [lessonId] =  useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setpercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(()=> {
    const incompleteIndex = challenges.findIndex((challenge) => !challenge.completed);
    return incompleteIndex === -1 ? 0 : incompleteIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current)=> current+1);
  };

  const onSelect=(id:number)=>{
    if(status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option)=>option.correct);
    
    if (correctOption && correctOption.id === selectedOption){
      startTransition(()=>{
        upsertChallengeProgress(challenge.id)
        .then((response)=>{
          if(response?.error === "hearts"){
            openHeartsModal();
            return;
          }

          correctControls.play();

          setStatus("correct");
          setpercentage((prev)=> prev+100/challenges.length);

          if(initialPercentage===100){
            setHearts((prev)=> Math.min(prev+1, 5));
          }
        })
        .catch(()=>toast.error("Something went wrong. Please try again."))
      });
    } else {
      startTransition(()=> {
        reduceHearts(challenge.id)
        .then((response)=> {
          if(response?.error === "hearts"){
            openHeartsModal();
            return;
          }

          incorrectControls.play();

          setStatus("wrong");

          if(!response?.error){
            setHearts((prev)=> Math.max(prev-1, 0));
          }
        }).catch(()=>toast.error("Something went wrong. Please try again."))
      });
    }
  };

  // todo remove hardcoded true
  if (!challenge){
    return(
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="h-full flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center">
          <Image src="/finish.svg" alt="Finish" className="block lg:hidden" height={50} width={50}/>
          <h1 className="text-xl lg:text-3xl font-build text-neutral-700">
          Great job! <br/> You've successfully completed the lesson.
          </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard
            variant="points"
            value={challenges.length *10}
          />
          <ResultCard
            variant="hearts"
            value={hearts}
          />
        </div>
        </div>
        <div className="h-[50vh]">
          <Footer 
          lessonId={lessonId}
          status="completed"
          onCheck={()=>router.push("/learn")}
        />
        </div>
        
      </>
    );
  }
  
  const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning" 
    : challenge.question;
  

  return(
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-[70vh] flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question}/>
              )}
              <Challenge 
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />

            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};