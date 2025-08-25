// src/components/Wheel.jsx
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const TAU = Math.PI * 2;
const foodColors = [
  "#FF6B6B", "#FFA94D", "#FFD93D",
  "#6BCB77", "#4D96FF", "#9D4EDD", "#A0522D",
];

const Wheel = forwardRef(({ prizes = [], onSpinEnd }, ref) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sizeRef = useRef(0); // 当前逻辑 size（CSS px）
  const dprRef = useRef(window.devicePixelRatio || 1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const norm = (x) => ((x % TAU) + TAU) % TAU;

  // 只做绘制（不改变 canvas.width/height）
  const drawWheel = (ctx, size) => {
    if (!ctx || !size) return;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(rotation);

    const num = Math.max(1, prizes.length);
    const angle = TAU / num;
    const fontSize = Math.max(10, size * 0.08);

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
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const mid = start + angle / 2;
      ctx.rotate(mid);
      ctx.translate(size * 0.32, 0);
      ctx.rotate(-mid);

      // 如果文字太长，可以简单换行/截断，这里做简单限制：
      const text = prizes[i] ?? "";
      const maxChars = Math.floor(size / 20);
      const shown = text.length > maxChars ? text.slice(0, maxChars - 1) + "…" : text;
      ctx.fillText(shown, 0, 0);
      ctx.restore();
    }

    ctx.restore();
  };

  // 当容器尺寸变化时（或首次），设置 canvas 像素尺寸（考虑 DPR）
  const setupCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 从容器读取可用宽度（不要用 canvas 的 width 来决定容器宽）
    // 限制最大尺寸，避免超大渲染负担
    const containerWidth = Math.floor(container.clientWidth);
    const max = 500; // 最大逻辑 px（按需调整）
    const size = Math.max(80, Math.min(containerWidth, max)); // 最小值保护

    // 如果尺寸没有变化就不用重新分配 backing buffer
    if (sizeRef.current === size && dprRef.current === (window.devicePixelRatio || 1)) {
      return;
    }

    sizeRef.current = size;
    dprRef.current = window.devicePixelRatio || 1;

    const dpr = dprRef.current;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);

    // 让 canvas 在布局上跟随父容器，不用固定像素宽度去撑父容器
    canvas.style.width = "100%"; // 跟随父容器宽度（container 应限制 max-width）
    canvas.style.height = `${size}px`; // 固定高度为实际逻辑 px

    const ctx = canvas.getContext("2d");
    // 把绘图坐标缩放到逻辑 px 单位（方便 drawWheel 使用 sizeRef.current 作为单位）
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 立刻重绘一次
    drawWheel(ctx, sizeRef.current);
  };

  // ResizeObserver 更可靠：监听容器大小变化（例如 flex 换行、父元素变化等）
  useEffect(() => {
    setupCanvasSize(); // 首次
    const ro = new ResizeObserver(() => {
      setupCanvasSize();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    // 兼容：也监听 window resize
    window.addEventListener("resize", setupCanvasSize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setupCanvasSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在 mount 时安装观察器

  // 当 rotation 或 prizes 变化时只重绘（不重新分配 backing buffer）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx, sizeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, prizes]);

  useImperativeHandle(ref, () => ({
    spin() {
      if (isSpinning) return Promise.reject(new Error("Wheel is already spinning"));

      return new Promise((resolve) => {
        setIsSpinning(true);

        const num = Math.max(1, prizes.length);
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
    },
    get isSpinning() {
      return isSpinning;
    },
  }), [isSpinning, rotation, prizes, onSpinEnd]);

  // 指针（三角）按 size 缩放，避免固定像素
  const pointerStyle = {
    position: "absolute",
    top: (sizeRef.current ? -Math.round(sizeRef.current * 0.05) : -20) + "px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: `${Math.max(6, Math.round((sizeRef.current || 100) * 0.03))}px solid transparent`,
    borderRight: `${Math.max(6, Math.round((sizeRef.current || 100) * 0.03))}px solid transparent`,
    borderTop: `${Math.max(12, Math.round((sizeRef.current || 100) * 0.06))}px solid red`,
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "block",
        width: "100%",        // 父容器控制宽度（在 FoodWheel 中设置 maxWidth）
        maxWidth: "500px",    // 最大逻辑宽度
        margin: "0 auto",
      }}
    >
      <canvas ref={canvasRef} style={{ borderRadius: "50%", display: "block" }} />
      <div style={pointerStyle} />
    </div>
  );
});

export default Wheel;
