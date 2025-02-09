import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return(
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>Default</Button>
      <Button variant="teal">Teal</Button>
      <Button variant="tealOutline">Teal Outline</Button>
      <Button variant="rose">Rose</Button>
      <Button variant="roseOutline">Rose Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger Outline</Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Sidebar Outline</Button>
    </div>
  )
};

export default ButtonsPage;