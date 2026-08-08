// ===========================================================================
// note記事ジェネレーター — アイキャッチ画像レンダラ（Canvas / 完全ローカル）
// note推奨サイズ 1280 x 670 で高級感のある表紙を描画し、PNG化する。
// ===========================================================================

import type { EyecatchAccent, EyecatchPattern, EyecatchSpec } from "./types";

export const EYECATCH_W = 1280;
export const EYECATCH_H = 670;

interface AccentColor {
  main: string;
  soft: string;
  rgb: [number, number, number];
}

const ACCENT_COLORS: Record<EyecatchAccent, AccentColor> = {
  gold: { main: "#e7c873", soft: "#f3dfa2", rgb: [231, 200, 115] },
  cyan: { main: "#38e1d6", soft: "#8ff3ec", rgb: [56, 225, 214] },
  blue: { main: "#4f7cff", soft: "#9db6ff", rgb: [79, 124, 255] },
};

const rgba = (rgb: [number, number, number], a: number) =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, EYECATCH_W, EYECATCH_H);
  g.addColorStop(0, "#0a1024");
  g.addColorStop(0.55, "#070c1c");
  g.addColorStop(1, "#050816");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, EYECATCH_W, EYECATCH_H);
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  pattern: EyecatchPattern,
  ac: AccentColor,
) {
  ctx.save();
  if (pattern === "aurora") {
    // 右上と左下に淡い発光
    const g1 = ctx.createRadialGradient(
      EYECATCH_W * 0.82,
      EYECATCH_H * 0.18,
      0,
      EYECATCH_W * 0.82,
      EYECATCH_H * 0.18,
      620,
    );
    g1.addColorStop(0, rgba(ac.rgb, 0.32));
    g1.addColorStop(1, rgba(ac.rgb, 0));
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, EYECATCH_W, EYECATCH_H);

    const g2 = ctx.createRadialGradient(
      EYECATCH_W * 0.1,
      EYECATCH_H * 0.95,
      0,
      EYECATCH_W * 0.1,
      EYECATCH_H * 0.95,
      520,
    );
    g2.addColorStop(0, "rgba(79, 124, 255, 0.22)");
    g2.addColorStop(1, "rgba(79, 124, 255, 0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, EYECATCH_W, EYECATCH_H);
  } else if (pattern === "beams") {
    // 斜めの光条
    ctx.globalCompositeOperation = "screen";
    for (let i = -4; i < 12; i++) {
      const x = i * 150;
      const g = ctx.createLinearGradient(x, 0, x + 300, EYECATCH_H);
      g.addColorStop(0, rgba(ac.rgb, 0));
      g.addColorStop(0.5, rgba(ac.rgb, i % 2 === 0 ? 0.06 : 0.03));
      g.addColorStop(1, rgba(ac.rgb, 0));
      ctx.fillStyle = g;
      ctx.save();
      ctx.translate(x, 0);
      ctx.rotate(0.32);
      ctx.fillRect(-60, -200, 120, EYECATCH_H + 400);
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-over";
    // 右上のグロー
    const gg = ctx.createRadialGradient(
      EYECATCH_W * 0.85,
      EYECATCH_H * 0.15,
      0,
      EYECATCH_W * 0.85,
      EYECATCH_H * 0.15,
      520,
    );
    gg.addColorStop(0, rgba(ac.rgb, 0.28));
    gg.addColorStop(1, rgba(ac.rgb, 0));
    ctx.fillStyle = gg;
    ctx.fillRect(0, 0, EYECATCH_W, EYECATCH_H);
  } else {
    // grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const step = 56;
    for (let x = step; x < EYECATCH_W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, EYECATCH_H);
      ctx.stroke();
    }
    for (let y = step; y < EYECATCH_H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(EYECATCH_W, y);
      ctx.stroke();
    }
    const gg = ctx.createRadialGradient(
      EYECATCH_W * 0.7,
      EYECATCH_H * 0.35,
      0,
      EYECATCH_W * 0.7,
      EYECATCH_H * 0.35,
      680,
    );
    gg.addColorStop(0, rgba(ac.rgb, 0.24));
    gg.addColorStop(1, rgba(ac.rgb, 0));
    ctx.fillStyle = gg;
    ctx.fillRect(0, 0, EYECATCH_W, EYECATCH_H);
  }
  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, ac: AccentColor) {
  const m = 28;
  ctx.save();
  ctx.strokeStyle = rgba(ac.rgb, 0.45);
  ctx.lineWidth = 1.5;
  roundRect(ctx, m, m, EYECATCH_W - m * 2, EYECATCH_H - m * 2, 20);
  ctx.stroke();
  // 左のアクセントバー
  ctx.fillStyle = ac.main;
  ctx.shadowColor = rgba(ac.rgb, 0.7);
  ctx.shadowBlur = 24;
  roundRect(ctx, 96, 250, 8, 170, 4);
  ctx.fill();
  ctx.restore();
}

const JP_STACK =
  '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Noto Sans JP", "Meiryo", sans-serif';

function drawBadge(
  ctx: CanvasRenderingContext2D,
  text: string,
  ac: AccentColor,
) {
  ctx.save();
  ctx.font = `700 26px ${JP_STACK}`;
  const padX = 22;
  const w = ctx.measureText(text).width + padX * 2;
  const x = 96;
  const y = 96;
  const h = 52;
  ctx.fillStyle = rgba(ac.rgb, 0.14);
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.strokeStyle = rgba(ac.rgb, 0.5);
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.stroke();
  ctx.fillStyle = ac.soft;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + padX, y + h / 2 + 1);
  ctx.restore();
}

function drawTitle(ctx: CanvasRenderingContext2D, title: string) {
  const lines = title.split("\n").slice(0, 3);
  const maxWidth = EYECATCH_W - 96 - 120;
  let size = 96;
  ctx.textBaseline = "alphabetic";
  // 最長行が収まるまで縮小
  const fits = () => {
    ctx.font = `800 ${size}px ${JP_STACK}`;
    return lines.every((l) => ctx.measureText(l).width <= maxWidth);
  };
  while (size > 46 && !fits()) size -= 4;
  ctx.font = `800 ${size}px ${JP_STACK}`;

  const lineH = size * 1.28;
  const totalH = lineH * lines.length;
  const startY = EYECATCH_H / 2 - totalH / 2 + size * 0.85;
  const x = 96;

  lines.forEach((line, i) => {
    const y = startY + i * lineH;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#eef2ff";
    ctx.fillText(line, x, y);
    ctx.restore();
  });
}

function drawSubtitle(
  ctx: CanvasRenderingContext2D,
  subtitle: string,
  ac: AccentColor,
) {
  ctx.save();
  ctx.font = `600 30px ${JP_STACK}`;
  ctx.fillStyle = "rgba(154, 166, 196, 0.95)";
  ctx.textBaseline = "alphabetic";
  const x = 100;
  const y = EYECATCH_H - 84;
  // アクセントのドット
  ctx.fillStyle = ac.main;
  ctx.beginPath();
  ctx.arc(x + 6, y - 10, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(154, 166, 196, 0.95)";
  const label = `for ${subtitle}`;
  const clipped =
    label.length > 34 ? label.slice(0, 33) + "…" : label;
  ctx.fillText(clipped, x + 24, y);
  ctx.restore();
}

function drawBrand(ctx: CanvasRenderingContext2D, ac: AccentColor) {
  ctx.save();
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 20px "Outfit", ${JP_STACK}`;
  ctx.fillStyle = rgba(ac.rgb, 0.85);
  ctx.fillText("AI副業2.0", EYECATCH_W - 100, EYECATCH_H - 100);
  ctx.font = `600 14px "Outfit", ${JP_STACK}`;
  ctx.fillStyle = "rgba(154, 166, 196, 0.7)";
  ctx.fillText("BONUS BOX", EYECATCH_W - 100, EYECATCH_H - 78);
  ctx.restore();
}

/** キャンバスにアイキャッチを描画する */
export function drawEyecatch(
  canvas: HTMLCanvasElement,
  spec: EyecatchSpec,
): void {
  canvas.width = EYECATCH_W;
  canvas.height = EYECATCH_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ac = ACCENT_COLORS[spec.accent];

  drawBackground(ctx);
  drawPattern(ctx, spec.pattern, ac);
  drawFrame(ctx, ac);
  drawBadge(ctx, spec.badge, ac);
  drawTitle(ctx, spec.title);
  drawSubtitle(ctx, spec.subtitle, ac);
  drawBrand(ctx, ac);
}

/** PNGとしてダウンロード */
export function downloadEyecatch(
  canvas: HTMLCanvasElement,
  filename: string,
): void {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
