type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }:Props) => {
  return(
    <div className="h-full flex flex-col ">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default LessonLayout;