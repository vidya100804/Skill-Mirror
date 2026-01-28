import "../styles/ProgressBar.css";

export default function ProgressBar({ current, total }) {
  return (
    <div className="progress">
      Question {current} / {total}
    </div>
  );
}
