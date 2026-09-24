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

  const status = getLessonStatus(now);
  const minutes = minutesUntilNextLesson(now);

  const currentLesson = getCurrentLesson(now);
  const nextLesson = getNextLesson(now);
  const todaysLessons = getTodaysLessons(now);

  const hours = String(now.getHours()).padStart(2, "0");
  const minutess = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 text-slate-800 antialiased">
      <main className="mx-auto max-w-2xl space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-white p-6 shadow-xs border border-slate-100">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Icon" className="h-10 w-10 object-contain rounded-lg" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Lesson Reminder</h1>
              <p className="text-xs font-medium text-blue-600 flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {status}
              </p>
            </div>
          </div>
          
          {/* Live High-Precision Clock */}
          <div className="bg-slate-900 text-white font-mono text-3xl font-bold tracking-wider py-2 px-4 rounded-xl shadow-inner text-center">
            {hours}:{minutess}<span className="text-slate-400 text-2xl">:{seconds}</span>
          </div>
        </header>

        {/* Dashboard Grid for Current & Next Lesson */}
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* Current Lesson Card */}
          <section className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs border border-slate-100 min-h-40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Lesson</h2>
                {currentLesson && <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100">Live</span>}
              </div>
              
              {currentLesson ? (
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{currentLesson.subject}</h3>
                  <p className="text-sm text-slate-500">{currentLesson.className}</p>
                </div>
              ) : (
                <p className="text-sm font-medium text-slate-400 py-2">No lesson running right now.</p>
              )}
            </div>
            
            {currentLesson && (
              <div className="mt-4 pt-3 border-t border-slate-50 text-xs font-semibold text-slate-600 font-mono">
                🕒 {currentLesson.start} - {currentLesson.end}
              </div>
            )}
          </section>

          {/* Next Lesson Card */}
          <section className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs border border-slate-100 min-h-40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Lesson</h2>
                {nextLesson && <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-100">Upcoming</span>}
              </div>
              
              {nextLesson ? (
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{nextLesson.subject}</h3>
                  <p className="text-sm text-slate-500">{nextLesson.className}</p>
                </div>
              ) : (
                <p className="text-sm font-medium text-slate-400 py-2">No more lessons today.</p>
              )}
            </div>
            
            {nextLesson && (
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-600 font-mono">🕒 {nextLesson.start} - {nextLesson.end}</span>
                <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium border border-amber-100">In {minutes}m</span>
              </div>
            )}
          </section>
        </div>

        {/* Today's Full Schedule Section */}
        <section className="rounded-2xl bg-white p-6 shadow-xs border border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Today's Full Schedule</h2>
          
          {todaysLessons.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <ul className="divide-y divide-slate-100">
                {todaysLessons.map((lesson) => {
                  const isCurrent = currentLesson?.id === lesson.id;
                  return (
                    <li 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 transition-colors ${
                        isCurrent ? "bg-blue-50/40" : "hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className={`text-sm font-bold ${isCurrent ? "text-blue-700" : "text-slate-900"}`}>
                          {lesson.subject}
                        </p>
                        <p className="text-xs text-slate-500">{lesson.className}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 py-1 px-2.5 rounded-md">
                          {lesson.start} - {lesson.end}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-400 text-center py-6">Your schedule is completely clear for today!</p>
          )}
        </section>

      </main>
    </div>
  );
}

export default App;
