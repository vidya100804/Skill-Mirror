import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ImprovementPlan.css";

import { useAssessment } from "../context/useAssessment";

export default function ImprovementPlan() {
  const { skill } = useParams();
  const navigate = useNavigate();
  const { result } = useAssessment();

  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resetAssessment } = useAssessment();

  useEffect(() => {
    if (!result || !skill) return;

    let isMounted = true; // 🛡️ prevents state update after unmount

    const fetchPlan = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "http://localhost:5000/api/improvement/generate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              skill,
              score: result.score,
              strengths: result.strengths,
              gaps: result.gaps,
            }),
          },
        );

        const data = await res.json();

        if (isMounted) {
          setPlan(data.plan || []);
        }
      } catch {
        if (isMounted) {
          setPlan([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlan();

    return () => {
      isMounted = false;
    };
  }, [skill, result]);

  if (!result) {
    return <p className="loading">No assessment data found.</p>;
  }

  return (
    <div className="improvement-page">
      {/* HEADER */}
      <header className="improvement-header">
        <h1>{skill.replace("-", " ")} Improvement Plan</h1>
        <p>A focused roadmap to close your gaps and improve your confidence.</p>
      </header>

      {/* LOADING */}
      {loading && <p className="loading">Generating your plan...</p>}

      {/* PLAN */}
      {!loading && (
        <section className="plan-list">
          {plan.map((step, index) => (
            <div className="plan-card glow" key={index}>
              <div className="plan-header">
                <span className="plan-step">Step {index + 1}</span>
                <span className={`priority ${step.priority?.toLowerCase()}`}>
                  {step.priority}
                </span>
              </div>

              <h3>{step.title}</h3>
              <p className="plan-why">{step.why}</p>

              <ul className="plan-actions">
                {step.actions.map((action) => (
                  <li key={action}>✓ {action}</li>
                ))}
              </ul>

              <div className="plan-footer">
                <p>
                  <strong>Practice:</strong> {step.practice}
                </p>
                <p>
                  <strong>Time:</strong> {step.time}
                </p>
                <p>
                  <strong>Impact:</strong> {step.impact}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ACTIONS */}
      <div className="plan-actions">
        <button
          className="secondary"
          onClick={() => {
            resetAssessment();
            navigate("/");
          }}
        >
          Retry Assessment
        </button>

        <button className="primary" onClick={() => navigate("/")}>
          Explore Other Skills
        </button>
      </div>
    </div>
  );
}
