import {QueryFunction, useQuery} from "@tanstack/react-query";

export interface ICourse {
    id: string;
    title: string;
    description: string;
    duration: string;
}

const fetchCourses: QueryFunction<ICourse[]> = async () => {
  const response = await fetch("/api/courses.json");

  if (!response.ok) {
      throw new Error("Netwotk was not ok");
  }

  return response.json();
}

export const useCourses = () => {
  return useQuery<ICourse[], Error>({
      queryKey: ['courses'],
      queryFn: fetchCourses,
  });
}