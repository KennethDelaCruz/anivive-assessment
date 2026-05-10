import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "@/types";
import type { RootState } from "../store";

type NotificationsState = {
  notifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    markNotificationAsRead(state, action: PayloadAction<Notification>) {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload.id,
      );
      if (notification) {
        notification.read = true;
      }
    },
    markNotificationAsUnread(state, action: PayloadAction<Notification>) {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload.id,
      );
      if (notification) {
        notification.read = false;
      }
    },
    markAllNotificationsAsRead(state) {
      state.notifications.forEach((notification) => (notification.read = true));
    },
  },
});

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;

export const selectUnreadNotificationsCount = (state: RootState) =>
  state.notifications.notifications.filter((notification) => !notification.read)
    .length;

export const {
  setNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  markNotificationAsUnread,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
