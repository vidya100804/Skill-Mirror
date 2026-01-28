// import SignInForm from "./SignInForm";
// import SignUpForm from "./SignUpForm";
// import "../styles/AuthModal.css";

// export default function AuthModal({ type, onClose }) {
//   return (
//     <div className="auth-overlay" onClick={onClose}>
//       {/* 3D PERSPECTIVE WRAPPER */}
//       <div className="auth-3d-scene">
//         <div
//           className="auth-box neon-glow"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button className="close-btn" onClick={onClose}>
//             ✕
//           </button>

//           <div className="auth-header">
//             <span className="ai-label">AI AUTH SYSTEM</span>
//             <h2>
//               {type === "signin" ? "Welcome Back" : "Create Your Account"}
//             </h2>
//             <div className="header-glow-line" />
//           </div>

//           {type === "signin" && <SignInForm onSuccess={onClose} />}
//           {type === "signup" && <SignUpForm onSuccess={onClose} />}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useRef } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "../styles/AuthModal.css";

export default function AuthModal({ type, onClose }) {
  const cardRef = useRef(null);

  // 🖱️ Mouse-based 3D tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = -(y / rect.height - 0.5) * 10;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(60px)
    `;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(50px)";
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-3d-scene">
        <div
          ref={cardRef}
          className="auth-box neon-glass"
          onClick={(e) => e.stopPropagation()}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          <div className="auth-header">
            <span className="ai-label">AI AUTH SYSTEM</span>
            <h2>
              {type === "signin" ? "Welcome Back" : "Create Your Account"}
            </h2>
            <div className="header-glow-line" />
          </div>

          {type === "signin" && <SignInForm onSuccess={onClose} />}
          {type === "signup" && <SignUpForm onSuccess={onClose} />}
        </div>
      </div>
    </div>
  );
}
