import { useState } from "react";
import "../styles/Home.css";
import SkillCard from "../components/SkillCard";
import CustomSkillInput from "../components/CustomSkillInput";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar.jsx";
import AINotification from "../components/AINotification";

import reactIcon from "../assets/icons/react.png";
import pythonIcon from "../assets/icons/python.png";
import sqlIcon from "../assets/icons/sql.png";
import mlIcon from "../assets/icons/ml.png";
import jsIcon from "../assets/icons/js.png";
import sdIcon from "../assets/icons/system-design.png";

import targetIcon from "../assets/icons/target.png";
import micIcon from "../assets/icons/mic.png";
import mirrorIcon from "../assets/icons/mirror.png";

import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/useAssessment";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();

  //  Assessment context
  const { setSkill, setInterviewId } = useAssessment();

  //  Auth context
  const { user } = useAuth();

  //  AI Notification state
  const [notification, setNotification] = useState(null);

  //  Difficulty state
  const [difficulty, setDifficulty] = useState("Beginner");

  const skills = [
    {
      name: "React",
      icon: reactIcon,
      desc: "Component architecture, hooks, state management",
      topics: ["Hooks", "State Management", "Component Patterns", "Performance", "Testing"],
    },
    {
      name: "Python",
      icon: pythonIcon,
      desc: "Core syntax, data structures, OOP concepts",
      topics: ["Data Structures", "OOP", "Error Handling", "Generators", "Decorators"],
    },
    {
      name: "SQL",
      icon: sqlIcon,
      desc: "Queries, joins, optimization, database design",
      topics: ["Joins", "Subqueries", "Indexing", "Normalization", "Query Planning"],
    },
    {
      name: "Machine Learning",
      icon: mlIcon,
      desc: "Algorithms, model training, evaluation metrics",
      topics: ["Supervised Learning", "Model Evaluation", "Feature Engineering", "Overfitting", "Cross Validation"],
    },
    {
      name: "JavaScript",
      icon: jsIcon,
      desc: "ES6+, async programming, DOM manipulation",
      topics: ["Closures", "Promises", "Event Loop", "Hoisting", "Memory Leaks"],
    },
    {
      name: "System Design",
      icon: sdIcon,
      desc: "Architecture patterns, scalability, distributed systems",
      topics: ["Scalability", "Load Balancing", "Caching", "CAP Theorem", "Sharding"],
    },
  ];

  //  START INTERVIEW HANDLER
  const startInterview = async (skillName) => {
    if (!user) {
      setNotification("Please sign in to start an interview");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: skillName,
          difficulty, //  send difficulty
        }),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();

      //  Save to context
      setSkill(skillName);
      setInterviewId(data.interviewId);

      //  Go to interview
      navigate("/interview");
    } catch (error) {
      console.error("Start interview error:", error);
      setNotification("Failed to start interview");
    }
  };

  return (
    <>
      <Navbar />

      <div className="home">
        <h1>
          Know What You <span>Actually</span> Know
        </h1>

        <p className="subtitle">
          Get an honest assessment of your real understanding — not certificates.
          Discover the gap between confidence and competence.
        </p>

        {/* 🎯 DIFFICULTY SELECTOR */}
        <h3 className="section-title">Choose difficulty</h3>
        <div className="difficulty-selector">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              className={`difficulty-btn ${difficulty === level ? "active" : ""}`}
              onClick={() => setDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {/* 🧠 SKILL SELECTION */}
        <h3 className="section-title">Select a skill to assess</h3>
        <div className="skill-grid">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              onClick={() => startInterview(skill.name)}
            />
          ))}
        </div>

        <CustomSkillInput onStart={startInterview} />

        {/* ✨ FEATURES */}
        <h3 className="section-title">Platform Features</h3>
        <div className="features">
          <FeatureCard
            icon={<img src={targetIcon} alt="Targeted Questions" className="feature-icon-img" />}
            title="5 Targeted Questions"
            desc="Expert-crafted questions covering key topics in your domain"
          />
          <FeatureCard
            icon={<img src={micIcon} alt="Voice Enabled" className="feature-icon-img" />}
            title="Voice Enabled"
            desc="Speak your answers naturally or type them out"
          />
          <FeatureCard
            icon={<img src={mirrorIcon} alt="Confidence Mirror" className="feature-icon-img" />}
            title="Confidence Mirror"
            desc="See the gap between what you think and reality"
          />
        </div>
      </div>

      {/* 🔔 AI NOTIFICATION */}
      {notification && (
        <AINotification
          message={notification}
          type="warning"
          duration={3500}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
