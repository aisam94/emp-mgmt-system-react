import { Notification } from "./notification";
import { useEffect, useState } from "react";

const NotificationContainer = ({ trigger, color, text }) => {
  const [notifications, setNotifications] = useState([]);

  const createNotification = (color, text) => {
    setNotifications([
      ...notifications,
      { color, id: notifications.length, text: text },
    ]);
  };

  useEffect(() => {
    if (trigger) {
      createNotification(color, text);
    }
  }, [trigger]);

  return (
    <div className="absolute top-1 right-1">
      {notifications.map(({ id, color, text }) => {
        return <Notification key={id} text={text} color={color} />;
      })}
    </div>
  );
};

export default NotificationContainer;
