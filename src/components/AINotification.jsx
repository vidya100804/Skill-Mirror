import { useEffect } from "react";
import "../styles/AINotification.css";

export default function AINotification({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`ai-notification ai-${type}`}>
      <div className="ai-header">
        <span className="ai-dot" />
        <span className="ai-title">AI SYSTEM</span>
      </div>

      <div className="ai-message">{message}</div>

      <div className="ai-progress">
        <span style={{ animationDuration: `${duration}ms` }} />
      </div>
    </div>
  );
}
