 import "../styles/SkillCard.css";
import TopicChip from "./TopicChip";

export default function SkillCard({ skill, onClick }) {
  return (
    <div className="skill-card" onClick={onClick}>
      <div className="skill-card-header">
        <div className="icon-wrapper">
          <img src={skill.icon} alt={skill.name} />
        </div>
        <span className="arrow">→</span>
      </div>

      <h4>{skill.name}</h4>
      <p>{skill.desc}</p>

      <div className="topics">
        {skill.topics.map((topic) => (
          <TopicChip key={topic} label={topic} />
        ))}
      </div>
    </div>
  );
}
