const notifiedLessons = new Set<string>();


export async function requestNotificationPermission() {

  if(!("Notification" in window)){
    console.warn("Notifications are not supported.");
    return;
  }

  if(Notification.permission === "default"){
    await Notification.requestPermission();
  }
}


export function notify(title: string, body: string, options?: NotificationOptions) {
  if (Notification.permission !== "granted") {
    return;
  }

  new Notification(title, {
    body,
    icon: "/favicon.png",
    ...options,
  });
}


export function hasBeenNotified(id: string) {
  return notifiedLessons.has(id);
}

export function markAsNotified(id: string) {
  notifiedLessons.add(id);
}
