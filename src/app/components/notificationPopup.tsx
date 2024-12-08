"use client";

import { useState } from "react";
import { Trash2, Mail, Archive, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Notification {
  id: number;
  text: string;
  time: string;
}

interface NotificationPopupProps {
  notifications: Notification[];
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications,
}) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Bell Icon with Badge */}
      <button onClick={toggleNotifications} className="relative">
        <span className="sr-only">Toggle notifications</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            fillRule="evenodd"
            d="M12 2a6 6 0 016 6v2.586l.293.293a1 1 0 01.207.293l1.007 2.006a1 1 0 01-.053.96 1 1 0 01-.853.514H5.4a1 1 0 01-.853-.514 1 1 0 01-.053-.96l1.007-2.006a1 1 0 01.207-.293L6 10.586V8a6 6 0 016-6zm-3 18a3 3 0 006 0H9z"
            clipRule="evenodd"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Popup */}
      {isNotificationOpen && (
        <div className="absolute top-10 right-0 w-[300px] bg-white shadow-md rounded-lg text-black z-10">
          {/* Actions */}
          <div className="flex items-center justify-between p-3 border-b">
            <Trash2 size={18} className="cursor-pointer" />
            <Archive size={18} className="cursor-pointer" />
            <Mail size={18} className="cursor-pointer" />
          </div>

          {/* Notification Items */}
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between px-3 py-2 border-b hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  <p className="text-sm">{notification.text}</p>
                </div>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;

export const LoginNotificationPop = () => {
  <Alert>
    <User className="h-4 w-4" />
    <AlertTitle>Signup Status</AlertTitle>
    <AlertDescription>You Have Successfully Signed Up!</AlertDescription>
  </Alert>;
};
