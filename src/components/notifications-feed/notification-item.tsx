import { useAppDispatch } from "@/redux/hooks";
import {
  markNotificationAsRead,
  markNotificationAsUnread,
} from "@/redux/features/notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Notification } from "@/types";
import styles from "./notification-feed.module.scss";

dayjs.extend(relativeTime);

type Props = {
  notification: Notification;
};

const TYPE_LABELS: Record<Notification["type"], string> = {
  info: "Info",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

export default function NotificationItem({ notification }: Props) {
  const dispatch = useAppDispatch();
  const isUnread = !notification.read;

  const handleClick = () => {
    if (notification.read) {
      dispatch(markNotificationAsUnread(notification));
    } else {
      dispatch(markNotificationAsRead(notification));
    }
  };

  return (
    <li
      className={`${styles["notification-item"]} ${isUnread ? styles["notification-item--unread"] : ""}`}
      onClick={handleClick}
    >
      <div className={styles[`notification-header`]}>
        <span
          className={`${styles["notification-badge"]} ${styles[`notification-badge--${notification.type}`]}`}
        >
          {TYPE_LABELS[notification.type]}
        </span>
        <span className={styles["notification-title"]}>
          {notification.title}
        </span>
        <span className={styles["notification-time"]}>
          {dayjs(notification.timestamp).fromNow()}
        </span>
      </div>
      <p className={styles["notification-message"]}>{notification.message}</p>
      <button className={styles["notification-button"]} onClick={handleClick}>
        Mark as {notification.read ? "unread" : "read"}
      </button>
    </li>
  );
}
