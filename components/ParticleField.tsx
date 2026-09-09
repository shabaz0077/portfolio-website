"use client";

const particles = [
  { left: "8%", top: "18%", size: 5, delay: "0s", color: "rgba(65, 105, 225, 0.4)" },
  { left: "18%", top: "72%", size: 3, delay: "2s", color: "rgba(201, 162, 39, 0.28)" },
  { left: "28%", top: "32%", size: 6, delay: "4s", color: "rgba(0, 35, 102, 0.45)" },
  { left: "42%", top: "12%", size: 4, delay: "1s", color: "rgba(138, 164, 255, 0.4)" },
  { left: "55%", top: "64%", size: 5, delay: "3s", color: "rgba(65, 105, 225, 0.32)" },
  { left: "68%", top: "22%", size: 3, delay: "5s", color: "rgba(201, 162, 39, 0.22)" },
  { left: "78%", top: "48%", size: 7, delay: "1.5s", color: "rgba(0, 35, 102, 0.38)" },
  { left: "88%", top: "78%", size: 4, delay: "2.5s", color: "rgba(138, 164, 255, 0.32)" },
];

export function ParticleField() {
  return (
    <div className="particle-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((item, index) => (
        <span
          key={`${item.left}-${index}`}
          className="particle"
          style={{
            left: item.left,
            top: item.top,
            width: item.size,
            height: item.size,
            background: item.color,
            animationDelay: item.delay,
            animationDuration: `${14 + index}s`,
          }}
        />
      ))}
    </div>
  );
}
