import "../styles/Waveform.css";

export default function Waveform({ active }) {
  return (
    <div className={`waveform ${active ? "active" : ""}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
