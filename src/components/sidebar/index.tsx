"use client";

import Link from "next/link";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSidebarCollapsed } from "@/redux/features/sidebar";
import {
  selectUnreadNotificationsCount,
  setNotifications,
} from "@/redux/features/notifications";
import styles from "./sidebar.module.scss";
import { useEffect } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/notifications", label: "Notifications" },
  { href: "/patients", label: "Patients" },
  { href: "/orders", label: "Orders" },
  { href: "/settings", label: "Settings" },
] as const;

export default function Sidebar() {
  const collapsed = useAppSelector(selectSidebarCollapsed);
  const unreadNotificationsCount = useAppSelector(
    selectUnreadNotificationsCount,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();

        dispatch(setNotifications(data));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, []);

  return (
    <aside
      aria-label="Main navigation"
      className={cn(styles["sidebar"], {
        [styles["sidebar--collapsed"] as string]: collapsed,
      })}
    >
      <nav className={styles["sidebar-nav"]}>
        {NAV_ITEMS.map(({ href, label }) => (
          <Link key={href} className={styles["nav-link"]} href={href}>
            <span className={styles["nav-label"]}>{label}</span>
            {/** Only show for notifcations Link */}
            {href === "/notifications" && unreadNotificationsCount > 0 && (
              <span className={styles["nav-unread-notifications-count"]}>
                {unreadNotificationsCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
