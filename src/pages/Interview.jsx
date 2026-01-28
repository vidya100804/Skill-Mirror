import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Interview.css";

import useTextToSpeech from "../hooks/useTextToSpeech";
import useSpeechToText from "../hooks/useSpeechToText";
import Waveform from "../components/Waveform";
import RoboIndicator from "../components/RoboIndicator";

import { useAssessment } from "../context/useAssessment";

/* MUI Icons */
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";

export default function Interview() {
  const navigate = useNavigate();

  const {
    skill,
    interviewId,
    currentQuestion,
    setCurrentQuestion,
    totalQuestions,
    setResult,
  } = useAssessment();

  // 🧠 Question + loading state
  const [questionText, setQuestionText] = useState("Loading first question...");
  const [loading, setLoading] = useState(false);

  // 🎙️ Voice hooks (DO NOT TOUCH)
  const { speak, stop, speaking } = useTextToSpeech();
  const { transcript, listening, startListening, stopListening } =
    useSpeechToText();

  // 🚫 Guard: no skill or interview → home
  useEffect(() => {
    if (!skill || !interviewId) {
      navigate("/");
    }
  }, [skill, interviewId, navigate]);

  // 🟢 LOAD FIRST QUESTION
  useEffect(() => {
    if (!interviewId) return;

    fetch("http://localhost:5000/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestionText(data.question);
        setCurrentQuestion(1); // reset counter on start
      })
      .catch(() => {
        setQuestionText("Failed to load first question");
      });
  }, [interviewId, skill, setCurrentQuestion]);

  // ➡️ NEXT BUTTON HANDLER
  const handleNext = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId,
          answer: transcript,
        }),
      });

      const data = await res.json();

      // 🎉 INTERVIEW FINISHED
      if (data.done) {
        setResult(data.result); // ✅ store final result
        navigate(`/result/${skill}`);
        return;
      }

      // ➡️ NEXT QUESTION
      setQuestionText(data.question);
      setCurrentQuestion((prev) => prev + 1);
    } catch {
      setQuestionText("Error loading next question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-page">
      {/* HEADER */}
      <div className="interview-header">
        <h2>{skill} Interview</h2>
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>

      {/* QUESTION CARD */}
      <div className="question-card glow">
        {/* 🤖 AI VISUAL */}
        <div className="assistant-visual">
          <RoboIndicator active={speaking || listening} />
          <Waveform active={speaking || listening} />
        </div>

        {/* QUESTION COUNTER */}
        <p className="question-count">
          Question {currentQuestion} of {totalQuestions}
        </p>

        <h3 className="question-text">{questionText}</h3>

        {/* ANSWER INPUT */}
        <textarea
          value={transcript}
          placeholder=" speak what you know!..."
          readOnly
        />

        {/* VOICE CONTROLS */}
        <div className="voice-controls">
          <div className="voice-item">
            <button
              className="icon-btn"
              onClick={() => speak(questionText)}
              disabled={!questionText}
            >
              <VolumeUpIcon />
            </button>
            <span>Read</span>
          </div>

          <div className="voice-item">
            <button className="icon-btn" onClick={stop}>
              <StopIcon />
            </button>
            <span>Stop</span>
          </div>

          <div className="voice-item">
            <button
              className="icon-btn"
              onClick={listening ? stopListening : startListening}
            >
              {listening ? <MicIcon /> : <MicNoneIcon />}
            </button>
            <span>Speak</span>
          </div>
        </div>

        {/* ACTION */}
        <div className="actions">
          <button className="next-btn" onClick={handleNext} disabled={loading}>
            {loading ? "Processing..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
