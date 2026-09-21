export type WeekDay = 
  | "Monday" 
  | "Tuesday" 
  | "Wednesday" 
  | "Thursday" 
  | "Friday";

export type LessonStatus =
  | "FREE"
  | "UPCOMING"
  | "IN_PROGRESS"
  | "DONE";


export interface Lesson {
  id: string;
  subject: string;
  className: string;
  day: WeekDay;
  start: string; // HH:mm
  end: string; // HH:mm
}