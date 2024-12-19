import {ICourse} from "../hooks/useCourses.ts";

export const CourseList: React.FC<{ courses: ICourse[] }> = ({courses}) => {
    return (
        <ul>
            {
                courses.map(course => (
                    <li key={course.id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <em>{course.duration}</em>
                    </li>
                ))
            }
        </ul>
    )
}