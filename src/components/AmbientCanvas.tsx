import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
};

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: Particle[] = [];
    let frame = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const draw = (elapsed: number) => {
      context.clearRect(0, 0, width, height);
      const isLight = document.documentElement.dataset.theme === "light";
      const connectionColor = isLight ? "92, 76, 139" : "184, 164, 255";
      const accentColor = isLight ? "172, 103, 139" : "242, 184, 213";
      const limit = Math.min(width, height) * 0.16;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const drift = reducedMotion.matches ? 0 : elapsed;
        particle.x += particle.vx * drift;
        particle.y += particle.vy * drift;

        if (particle.x < -0.02 || particle.x > 1.02) particle.vx *= -1;
        if (particle.y < -0.02 || particle.y > 1.02) particle.vy *= -1;
        particle.x = Math.max(-0.02, Math.min(1.02, particle.x));
        particle.y = Math.max(-0.02, Math.min(1.02, particle.y));

        const x = particle.x * width;
        const y = particle.y * height;
        const radius = 1.1 + Math.sin(particle.phase + performance.now() / 1800) * 0.35;

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex];
          const dx = (particle.x - other.x) * width;
          const dy = (particle.y - other.y) * height;
          const distance = Math.hypot(dx, dy);
          if (distance > limit) continue;

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(other.x * width, other.y * height);
          context.strokeStyle = `rgba(${connectionColor}, ${(1 - distance / limit) * 0.12})`;
          context.lineWidth = 0.65;
          context.stroke();
        }

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.phase % 2 > 1 ? accentColor : connectionColor}, ${isLight ? 0.24 : 0.37})`;
        context.fill();
      }
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1 : 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(54, Math.max(22, Math.floor((width * height) / 26000)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.000024,
        vy: (Math.random() - 0.5) * 0.000024,
        phase: index * 1.7,
      }));

      draw(0);
    };

    const animate = (time: number) => {
      if (document.hidden) return;
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;
      draw(elapsed);
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      if (reducedMotion.matches) draw(0);
      else frame = window.requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) window.cancelAnimationFrame(frame);
      else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", start);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
