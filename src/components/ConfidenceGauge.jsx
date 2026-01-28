import "../styles/ConfidenceGauge.css";

export default function ConfidenceGauge({ score }) {
  return (
    <div className="confidence-gauge">
      <svg viewBox="0 0 200 120">
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          className="gauge-bg"
        />
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          className="gauge-fill"
          style={{
            strokeDasharray: `${score * 2.5} 999`
          }}
        />
      </svg>

      <div className="score">
        <span>{score}</span>
        <small>/100</small>
      </div>

      <p className="label">
        Confidence Accuracy
      </p>
    </div>
  );
}
