/** 背景の発光オーラ。#050816 の上にゴールド/シアン/ブルーの光をにじませる。 */
export function BackgroundAura() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* ベースの深い夜空 */}
      <div className="absolute inset-0 bg-base-900" />

      {/* グリッド（極薄） */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />

      {/* ゴールドの光 */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-gold/20 blur-[130px] animate-pulse-glow" />
      {/* シアンの光 */}
      <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-neon-cyan/15 blur-[130px] animate-pulse-glow" />
      {/* ブルーの光 */}
      <div className="absolute bottom-0 -right-24 h-[460px] w-[460px] rounded-full bg-neon-blue/15 blur-[130px] animate-pulse-glow" />

      {/* 上部のビネット */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
}
