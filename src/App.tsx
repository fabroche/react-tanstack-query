import './App.css'
import {lazy, Suspense, useMemo, useState, useTransition} from "react";
import {useCourses} from "./hooks/useCourses.ts";

const CourseList = lazy(() => import("./components/CourseList.tsx"));

const App: React.FC = () => {
    const {data: courses, isLoading, error} = useCourses();

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 2;

    const [isPending, startTransition] = useTransition();

    const currentCourses = useMemo(() => {
        if (!courses) return []

        const indexOfFirstCourse = (currentPage - 1) * coursesPerPage;
        const indexOfLastCourse = indexOfFirstCourse + coursesPerPage;

        return courses?.slice(indexOfFirstCourse, indexOfLastCourse)
    }, [courses, currentPage, coursesPerPage])

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: {error}</div>

    if (!courses) return <div>Courses not Found</div>

    return (
        <section>
            <h1>📚 Learning Courses 📚</h1>
            <Suspense fallback={<div>Loading Courses...</div>}>
                <CourseList courses={currentCourses}/>
            </Suspense>
            <div>
                {
                    Array.from({length: Math.ceil(courses.length / coursesPerPage)}).map((_, index) => (
                        <button key={index} onClick={() => {
                            startTransition(() => {
                                setCurrentPage(index + 1);
                            });
                        }}> {index + 1} </button>))
                }
            </div>
            {isPending && <div>Loading new Page...</div>}
        </section>
    )
}

export default App
