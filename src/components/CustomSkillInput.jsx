// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/CustomSkillInput.css";

// export default function CustomSkillInput() {
//   const [skill, setSkill] = useState("");
//   const navigate = useNavigate();

//   const handleStart = () => {
//     if (!skill.trim()) return;
//     navigate(`/interview/${encodeURIComponent(skill.trim())}`);
//   };

//   return (
//     <div className="custom-skill">
//       <h3>Create your own skill assessment</h3>

//       <div className="input-row">
//         <input
//           type="text"
//           placeholder="e.g. Docker, Kubernetes, GraphQL..."
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleStart()}
//         />

//         <button onClick={handleStart}>→</button>
//       </div>

//       <span
//         className="cancel"
//         onClick={() => setSkill("")}
//       >
//         Cancel
//       </span>
//     </div>
//   );
// }
import { useState } from "react";
import "../styles/CustomSkillInput.css";

export default function CustomSkillInput({ onStart }) {
  const [skillInput, setSkillInput] = useState("");

  const handleStart = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    onStart(trimmed);
    setSkillInput("");
  };

  return (
    <div className="custom-skill">
      <h3>Create your own skill assessment</h3>

      <div className="input-row">
        <input
          type="text"
          placeholder="e.g. Docker, Kubernetes, GraphQL..."
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
        />

        <button onClick={handleStart}>→</button>
      </div>

      <span className="cancel" onClick={() => setSkillInput("")}>
        Cancel
      </span>
    </div>
  );
}
