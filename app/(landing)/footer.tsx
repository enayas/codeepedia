import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return(
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="xl" variant="ghost" className="w-full">
          <Image src="/css.svg" alt="css" height={30} width={50}/>
          CSS
        </Button>
        <Button size="xl" variant="ghost" className="w-full">
          <Image src="/html.svg" alt="css" height={30} width={50}/>
          HTML
        </Button>
        <Button size="xl" variant="ghost" className="w-full">
          <Image src="/js.svg" alt="css" height={30} width={50}/>
          JavaScript
        </Button>
        <Button size="xl" variant="ghost" className="w-full">
          <Image src="/py.svg" alt="css" height={30} width={50}/>
          Python
        </Button>
      </div>
    </footer>
  );
};