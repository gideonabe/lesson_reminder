import timetableData from "../data/timetable.json";
import type { Lesson, LessonStatus, WeekDay } from "../types";

export const timetable = timetableData as Lesson[];

function getToday(date: Date = new Date()): WeekDay {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
  }) as WeekDay
}

export function getTodaysLessons(date: Date = new Date()): Lesson[]{
  const today = getToday(date);

  return timetable
    .filter((lesson) => lesson.day === today)
    .sort((a, b) => a.start.localeCompare(b.start));
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function currentTimeInMinutes(date: Date = new Date()): number {
  // const now = new Date();

  return date.getHours() * 60 + date.getMinutes();
}

export function getCurrentLesson(date: Date = new Date()): Lesson | null {
  const now = currentTimeInMinutes(date);

  return (
    getTodaysLessons(date).find((lesson) => {
      const start = timeToMinutes(lesson.start);
      const end = timeToMinutes(lesson.end);

      return now >= start && now < end;
    }) ?? null
  );
}

export function getNextLesson(date: Date = new Date()): Lesson | null {
  const now = currentTimeInMinutes(date);

  return (
    getTodaysLessons(date).find(
      (lesson) => timeToMinutes(lesson.start) > now
    ) ?? null
  );
}


export function minutesUntilNextLesson(
  date: Date = new Date()
): number | null {
  const lesson = getNextLesson(date);

  if (!lesson) return null;

  return timeToMinutes(lesson.start) - currentTimeInMinutes(date);
}



export function getLessonStatus(
  date: Date = new Date()
): LessonStatus {
  if (getCurrentLesson(date)) {
    return "IN_PROGRESS";
  }

  if (getNextLesson()) {
    return "UPCOMING";
  }

  return "FREE";
}


export function checkForUpcomingLesson(
  date = new Date()
): Lesson | null {
  const lesson = getNextLesson(date);

  if (!lesson) {
    return null;
  }

  const minutes =
    timeToMinutes(lesson.start) -
    currentTimeInMinutes(date);

  return minutes === 10 ? lesson : null;
}

