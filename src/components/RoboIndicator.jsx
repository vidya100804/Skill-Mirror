import "../styles/RoboIndicator.css";
import robo from "../assets/icons/robo.png";

export default function RoboIndicator({ active }) {
  return (
    <div className={`robo-indicator ${active ? "active" : ""}`}>
      <img src={robo} alt="AI Assistant" />
    </div>
  );
}
