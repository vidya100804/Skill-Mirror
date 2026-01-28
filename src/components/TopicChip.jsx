import "../styles/TopicChip.css";

export default function TopicChip({ label, muted }) {
  return <span className={`chip ${muted ? "muted" : ""}`}>{label}</span>;
}
