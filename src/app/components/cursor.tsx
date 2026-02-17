import { useEffect, useRef } from "react";

const colors = [
  "#00d9ff",
  "#00d9ff",
  "#00d9ff",
  "#4a5fd9",
  "#4a5fd9",
  "#4a5fd9",
];
const DOT_COUNT = 50;

type Position = { x: number; y: number };

export function TriCursor() {
  const cursorRefs = useRef<Position[]>(
    Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 })),
  );
  const dots = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRefs.current[0] = { x: e.clientX + -10, y: e.clientY - 10 };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      for (let i = 1; i < DOT_COUNT; i++) {
        const prev = cursorRefs.current[i - 1];
        const curr = cursorRefs.current[i];

        // Slow down progressively:
        // head (i=1) = fast, tail (i=DOT_COUNT-1) = much slower
        const minSpeed = 0.5; // very slow tail
        const maxSpeed = 1; // fast head
        const delayFactor =
          maxSpeed - (i / (DOT_COUNT - 10)) * (maxSpeed - minSpeed);

        curr.x += (prev.x - curr.x) * delayFactor;
        curr.y += (prev.y - curr.y) * delayFactor;
      }

      dots.current.forEach((dot, i) => {
        if (!dot) return;
        const color = colors[i % colors.length];
        dot.style.width = "25px";
        dot.style.height = "25px";
        dot.style.borderRadius = "50%";
        dot.style.backgroundColor = color;
        dot.style.opacity = ".10";
        dot.style.transform = `translate3d(${cursorRefs.current[i].x}px, ${cursorRefs.current[i].y}px, 0)`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dots.current[i] = el;
          }}
          className="fixed top-0 left-0 pointer-events-none "
          style={{ transform: "translate3d(0,0,0)", zIndex: 1000 }}
        />
      ))}
    </>
  );
}
