import { useEffect, useRef } from "react";

const WIDTH = 170;
const HEIGHT = 48;

const CaptchaImage = ({ value }: { value: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.clearRect(0, 0, WIDTH, HEIGHT);

    const gradient = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#fff7db");
    gradient.addColorStop(1, "#ffffff");
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, HEIGHT);

    for (let offset = -HEIGHT; offset < WIDTH; offset += 8) {
      context.strokeStyle = "rgba(222, 190, 74, 0.35)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(offset, 0);
      context.lineTo(offset + HEIGHT, HEIGHT);
      context.stroke();
    }

    for (let index = 0; index < 18; index += 1) {
      context.fillStyle = "rgba(28, 63, 104, 0.08)";
      context.beginPath();
      context.arc(
        Math.random() * WIDTH,
        Math.random() * HEIGHT,
        1 + Math.random() * 2,
        0,
        Math.PI * 2
      );
      context.fill();
    }

    context.textBaseline = "middle";
    context.textAlign = "center";

    [...value].forEach((character, index) => {
      const x = 24 + index * 24;
      const y = HEIGHT / 2 + (Math.random() * 8 - 4);
      const angle = (Math.random() * 0.45) - 0.225;

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.font = `${28 + Math.floor(Math.random() * 4)}px Georgia`;
      context.fillStyle = "#26456b";
      context.fillText(character, 0, 0);
      context.restore();
    });

    context.strokeStyle = "rgba(38, 69, 107, 0.45)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(6, 30);
    context.bezierCurveTo(45, 8, 92, 44, WIDTH - 8, 18);
    context.stroke();
  }, [value]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className="block rounded-md border border-amber-200 bg-white"
      aria-label="Captcha challenge"
    />
  );
};

export default CaptchaImage;
