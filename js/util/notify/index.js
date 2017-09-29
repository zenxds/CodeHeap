export default function notify(msg) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert(msg)
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(msg)
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(msg)
      }
    })
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}