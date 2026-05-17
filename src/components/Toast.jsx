import "../styles/Toast.css";

export default function Toast({ message, type = "info", onClose }) {
  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  );
}
