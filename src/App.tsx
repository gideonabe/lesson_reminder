import { useEffect, useState } from "react";
import {
  checkForUpcomingLesson,
  getCurrentLesson,
  getLessonStatus,
  getNextLesson,
  getTodaysLessons,
  minutesUntilNextLesson,
} from "./lib/scheduler";
import { hasBeenNotified, markAsNotified, notify, requestNotificationPermission } from "./lib/notifications";

function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    // }, 60_000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const lesson = checkForUpcomingLesson(now);

    if (!lesson) return;

    if (hasBeenNotified(lesson.id)) return;

    notify(
      "Upcoming Lesson",
      `${lesson.subject} (${lesson.className}) starts in 10 minutes.`,
      { icon: "/favicon.png" }
    );

    markAsNotified(lesson.id);
  }, [now]);



  // const todayLessons = getTodaysLessons();
  // const currentLesson = getCurrentLesson();
  // const nextLesson = getNextLesson();
  const status = getLessonStatus();
  const minutes = minutesUntilNextLesson();

  const currentLesson = getCurrentLesson(now);
  const nextLesson = getNextLesson(now);
  const todaysLessons = getTodaysLessons(now);

  // Format hours, minutes, and seconds to always be 2 digits
  const hours = String(now.getHours()).padStart(2, "0");
  const minutess = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");


  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>📚 Lesson Reminder</h1>

      <hr />

      <h1 className="font-mono text-4xl font-bold tracking-wider text-slate-800">
        {hours}:{minutess}:{seconds}
      </h1>

      <h2>Status</h2>

      <p>{status}</p>

      <hr />

      <h2>Current Lesson</h2>

      {currentLesson ? (
        <>
          <p>
            <strong>{currentLesson.subject}</strong>
          </p>

          <p>{currentLesson.className}</p>

          <p>
            {currentLesson.start} - {currentLesson.end}
          </p>
        </>
      ) : (
        <p>No lesson currently.</p>
      )}

      <hr />

      <h2>Next Lesson</h2>

      {nextLesson ? (
        <>
          <p>
            <strong>{nextLesson.subject}</strong>
          </p>

          <p>{nextLesson.className}</p>

          <p>
            {nextLesson.start} - {nextLesson.end}
          </p>

          <p>Starts in {minutes} minutes</p>
        </>
      ) : (
        <p>No more lessons today.</p>
      )}

      <hr />

      <h2>Today's Lessons</h2>

      <ul>
        {todaysLessons.map((lesson) => (
          <li key={lesson.id}>
            {lesson.start} - {lesson.end} | {lesson.subject} |{" "}
            {lesson.className}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
