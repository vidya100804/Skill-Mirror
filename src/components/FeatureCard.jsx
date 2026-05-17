import "../styles/FeatureCard.css";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <span className="icon">{icon}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
