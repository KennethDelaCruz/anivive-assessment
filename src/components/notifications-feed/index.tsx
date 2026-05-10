"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectNotifications } from "@/redux/features/notifications";
import NotificationItem from "./notification-item";
import styles from "./notification-feed.module.scss";

export default function NotificationFeed() {
  const notifications = useAppSelector(selectNotifications);

  if (notifications.length === 0) {
    return <p className={styles["empty-state"]}>No notifications.</p>;
  }

  return (
    <ul className={styles["notifications-list"]}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}
