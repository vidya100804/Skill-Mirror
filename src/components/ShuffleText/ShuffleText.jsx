import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import "./ShuffleText.css";

export default function ShuffleText({
  text,
  tag = "h1",
  className = "",
  shuffleDirection = "right", // right | left | up | down
  duration = 0.9,
  stagger = 0.08,
  shuffleTimes = 3,
  ease = "power2.out",
  trigger = "mount" // mount | hover
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const chars = el.querySelectorAll(".shuffle-char");

    if (!chars.length) return;

    const isHorizontal =
      shuffleDirection === "left" || shuffleDirection === "right";
    const axis = isHorizontal ? "x" : "y";
    const direction =
      shuffleDirection === "left" || shuffleDirection === "up" ? -1 : 1;

    gsap.set(el, { visibility: "visible" });
    gsap.set(chars, {
      opacity: 0,
      [axis]: (i) => direction * 40 * ((i % shuffleTimes) + 1)
    });

    const play = () => {
      gsap.to(chars, {
        opacity: 1,
        [axis]: 0,
        duration,
        ease,
        stagger,
        onComplete: () => setReady(true)
      });
    };

    if (trigger === "mount") play();

    if (trigger === "hover") {
      el.addEventListener("mouseenter", play);
      return () => el.removeEventListener("mouseenter", play);
    }
  }, [
    text,
    shuffleDirection,
    duration,
    stagger,
    shuffleTimes,
    ease,
    trigger
  ]);

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`shuffle-parent ${ready ? "is-ready" : ""} ${className}`}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="shuffle-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
