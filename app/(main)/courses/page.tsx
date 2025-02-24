import { getCourseProgress, getCourses, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries"
import { List } from "./list"

const CoursesPage = async () => {
  const coursesData = getCourses();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userProgressData = getUserProgress();


  const [
    courses,
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    coursesData,
    userProgressData,
    courseProgressData,
    lessonPercentageData,
    unitsData,
  ]);
  
  return (
    <div className= "h-full max-w-[912px] px-3 mx-auto">
      <h1 className="tex-2xl font-bold text-neutral-700">
        Programming Language Courses
      </h1>
      <List 
      courses={courses} 
      activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;