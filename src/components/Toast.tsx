import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

const toastColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export default function Toast({
  message,
  type = "success",
  duration = 2000,
  onClose,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-xs px-5 py-3 rounded-xl text-white shadow-xl 
        ${toastColors[type]} transform transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-center space-x-3">
        {type === "success" && <span>✅</span>}
        {type === "error" && <span>❌</span>}
        {type === "info" && <span>ℹ️</span>}

        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
