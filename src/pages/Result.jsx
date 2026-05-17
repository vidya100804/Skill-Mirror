import { useNavigate, useParams } from "react-router-dom";
import { useAssessment } from "../context/useAssessment";
import ConfidenceGauge from "../components/ConfidenceGauge";
import "../styles/Result.css";

export default function Result() {
  const navigate = useNavigate();
  const { skill } = useParams();
  const { result } = useAssessment();

  // ⏳ Guard: result not ready
  if (!result) {
    return <p className="loading">Loading result...</p>;
  }

  const { score, strengths, gaps } = result;

  return (
    <div className="result-page">
      {/* HERO */}
      <section className="result-hero">
        <h1>Your {skill} Assessment Result</h1>
        <p>How closely your confidence matches your actual understanding</p>

        <ConfidenceGauge score={score} />
      </section>

      {/* BREAKDOWN */}
      <section className="result-grid">
        <div className="result-card good">
          <h3>What You Did Well</h3>
          <ul>
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card gap">
          <h3>Where You Need Work</h3>
          <ul>
            {gaps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="result-actions">
        <button className="retry" onClick={() => navigate("/interview")}>
          Retry Assessment
        </button>

        <button
          className="improve"
          onClick={() => navigate(`/improvement/${skill}`)}
        >
          View Improvement Plan
        </button>
      </section>
    </div>
  );
}
