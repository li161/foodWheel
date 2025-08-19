// src/components/Wheel.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

const TAU = Math.PI * 2;
const foodColors = [
  "#FF6B6B", // 红 - 草莓/西瓜
  "#FFA94D", // 橙 - 橘子/南瓜
  "#FFD93D", // 黄 - 香蕉/柠檬
  "#6BCB77", // 绿 - 青菜/苹果
  "#4D96FF", // 蓝 - 蓝莓
  "#9D4EDD", // 紫 - 葡萄
  "#A0522D", // 棕 - 巧克力/咖啡
];

const Wheel = forwardRef(({ prizes = ["一等奖", "二等奖", "三等奖", "谢谢参与", "四等奖", "五等奖"], onSpinEnd }, ref) => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const norm = (x) => ((x % TAU) + TAU) % TAU;

  const drawWheel = (ctx, size) => {
    const num = prizes.length;
    const angle = (2 * Math.PI) / num;

    ctx.clearRect(0, 0, size, size);
    ctx.translate(size / 2, size / 2);
    ctx.rotate(rotation);

    for (let i = 0; i < num; i++) {
      const start = -Math.PI / 2 + i * angle;
      const end = start + angle;

      // 扇区
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, size / 2, start, end);
      ctx.closePath();
      ctx.fillStyle = foodColors[i % foodColors.length];
      ctx.fill();

      // 文字
      ctx.save();
      ctx.fillStyle = "#000";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const mid = start + angle / 2;
      ctx.rotate(mid);
      ctx.translate(size * 0.32, 0);
      ctx.rotate(-mid);
      ctx.fillText(prizes[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const logicalSize = 400;
    canvas.width = logicalSize * dpr;
    canvas.height = logicalSize * dpr;
    canvas.style.width = logicalSize + "px";
    canvas.style.height = logicalSize + "px";

    drawWheel(ctx, canvas.width);
  }, [rotation, prizes]);

  useImperativeHandle(ref, () => ({
    spin() {
      if (isSpinning) return Promise.reject(new Error("Wheel is already spinning"));
      
      return new Promise((resolve) => {
        setIsSpinning(true);

        const num = prizes.length;
        const angle = TAU / num;
        const targetIndex = Math.floor(Math.random() * num);
        const startRot = rotation;
        const startMod = norm(startRot);
        const desiredMod = norm(-(targetIndex + 0.5) * angle);
        const extraSpins = 5;
        const deltaToDesired = norm(desiredMod - startMod);
        const finalRot = startRot + extraSpins * TAU + deltaToDesired;
        const duration = 4000;
        let t0 = 0;

        const animate = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min(1, (ts - t0) / duration);
          const easeOut = 1 - Math.pow(1 - p, 3);

          setRotation(startRot + (finalRot - startRot) * easeOut);

          if (p < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsSpinning(false);
            const result = prizes[targetIndex];
            onSpinEnd?.(result);
            resolve(result);
          }
        };
        requestAnimationFrame(animate);
      });
    }
  }));

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        style={{ borderRadius: "50%" }} 
      />
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "0",
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderTop: "30px solid red",
        }}
      ></div>
    </div>
  );
});

export default Wheel;