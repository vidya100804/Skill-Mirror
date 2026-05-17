import "../styles/QuestionCard.css";

export default function QuestionCard({ question, topic }) {
  return (
    <div className="question-card">
      <span className="topic">{topic}</span>
      <h3>{question}</h3>
    </div>
  );
}
