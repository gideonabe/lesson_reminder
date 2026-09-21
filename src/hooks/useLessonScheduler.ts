import { useEffect, useState } from "react";
import { getCurrentLesson, getLessonStatus, getNextLesson, getTodaysLessons, minutesUntilNextLesson } from "../lib/scheduler";

export function useLessonScheduler() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return {
    now,
    currentLesson: getCurrentLesson(now),
    nextLesson: getNextLesson(now),
    todaysLessons: getTodaysLessons(now),
    status: getLessonStatus(now),
    minutesUntilNextLesson: minutesUntilNextLesson(now),
  };
}
