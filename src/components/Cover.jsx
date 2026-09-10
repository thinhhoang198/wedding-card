import FallingPetals from './FallingPetals'

/**
 * Màn Cover full-screen (không cuộn). Card ~600×420 với hoạ tiết hoa.
 * Khi bấm "Mở thiệp" (closing=true): hoạ tiết lóe sáng → thiệp bay từ giữa
 * lên trên & biến mất → sau đó thiệp chính hiện ra.
 */
export default function Cover({ data, onOpen, closing }) {
  const { groom, bride, weddingDate } = data

  return (
    <div className={`cover ${closing ? 'is-closing' : ''}`}>
      {/* Chữ Hỷ (囍) bay nền cover */}
      <FallingPetals
        position="absolute"
        zIndex={1}
        maxWidth="100%"
        count={14}
        symbol="囍"
        color="var(--c-accent)"
        minSize={16}
        maxSize={34}
      />

      <div className="cover-card">
        {/* hoa trang trí 2 góc dưới (bên phải lật gương cho cân đối) */}
        <img className="flower flower-l" src="/decor/flower.webp" alt="" aria-hidden />
        <img className="flower flower-r" src="/decor/flower.webp" alt="" aria-hidden />

        {/* các tia sáng lóe khi mở */}
        <span className="spark s1" aria-hidden>✦</span>
        <span className="spark s2" aria-hidden>✧</span>
        <span className="spark s3" aria-hidden>✦</span>
        <span className="spark s4" aria-hidden>✧</span>

        <div className="cover-inner">
          <div className="seal float" aria-hidden>♥</div>
          <p className="cover-sub">Save The Date</p>
          <h1 className="cover-names">
            <span>{groom.shortName}</span>
            <em>&amp;</em>
            <span>{bride.shortName}</span>
          </h1>
          <div className="divider" aria-hidden>❦</div>
          <p className="cover-date">{weddingDate.solar}</p>
          <p className="cover-invite">Thân Mời</p>
          <button className="btn btn-primary open-btn" onClick={onOpen} disabled={closing}>
            <span>Mở thiệp</span>
            <i className="shine" aria-hidden />
          </button>
        </div>
      </div>

      <style>{`
        .cover {
          position: fixed;
          inset: 0;
          z-index: 15;
          width: 100vw;
          height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background:
            radial-gradient(120% 90% at 50% 0%, var(--c-primary-soft), var(--c-bg) 70%);
        }

        /* ---- Trạng thái đóng: lóe sáng → bay lên → mờ dần ---- */
        .cover.is-closing { animation: coverFadeLate 1.9s ease forwards; pointer-events: none; }
        .cover.is-closing .cover-card {
          animation: cardGlow 0.65s ease 1, cardLift 1.5s cubic-bezier(0.5, 0, 0.15, 1) 0.4s forwards;
        }
        .cover.is-closing .flower { animation: decoFlash 0.75s ease forwards; }
        .cover.is-closing .spark { animation: sparkPop 0.85s ease forwards; }
        .cover.is-closing .cover-inner { animation: innerFade 0.5s ease 0.25s forwards; }

        @keyframes coverFadeLate { 0%, 62% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes cardLift {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          12% { transform: translateY(18px) scale(0.99); }   /* nhún lấy đà */
          100% { transform: translateY(-135vh) scale(0.78); opacity: 0; }
        }
        @keyframes cardGlow {
          0% { box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
          35% { box-shadow: 0 0 70px 16px rgba(255,240,200,0.95), 0 20px 50px rgba(0,0,0,0.4); }
          100% { box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        }
        @keyframes decoFlash {
          0% { filter: brightness(1); }
          35% { filter: brightness(2.6) drop-shadow(0 0 12px #fff2cf); transform: scale(1.08); }
          100% { filter: brightness(1.15); }
        }
        @keyframes sparkPop {
          0% { opacity: 0; transform: scale(0.2) rotate(0deg); }
          45% { opacity: 1; transform: scale(1.6) rotate(90deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(170deg); }
        }
        @keyframes innerFade { to { opacity: 0.15; } }

        .cover-card {
          position: relative;
          z-index: 2;
          width: min(600px, 92vw);
          height: min(420px, 78vh);
          background: var(--c-cream);
          border-radius: var(--radius);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          border: 1px solid rgba(201,161,90,0.4);
          overflow: hidden;
        }
        .cover-inner {
          position: relative; z-index: 2;
          height: 100%;
          padding: 22px 30px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
        }
        .cover-inner .divider { margin: 6px auto 12px; }

        /* hoa trang trí 2 góc dưới */
        .flower {
          position: absolute; bottom: -2px; z-index: 1;
          height: min(66%, 320px); width: auto;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.18));
          pointer-events: none; user-select: none;
        }
        .flower-l { left: -10px; }
        .flower-r { right: -10px; transform: scaleX(-1); }
        @media (max-width: 420px) { .flower { height: 56%; } }

        /* tia sáng (ẩn, chỉ bùng lên khi mở) */
        .spark {
          position: absolute; opacity: 0; color: #fff3d4;
          font-size: 26px; text-shadow: 0 0 10px #ffe9a8; pointer-events: none;
        }
        .spark.s1 { top: 18%; left: 20%; }
        .spark.s2 { top: 26%; right: 18%; }
        .spark.s3 { bottom: 22%; left: 26%; }
        .spark.s4 { bottom: 28%; right: 24%; }

        .seal {
          width: 46px; height: 46px; margin: 0 auto 10px; border-radius: 50%;
          background: var(--c-primary); color: var(--c-cream);
          display: flex; align-items: center; justify-content: center; font-size: 20px;
          animation: seal-pulse 2.6s ease-in-out infinite, drFloat 4s ease-in-out infinite;
        }
        .cover-sub {
          font-family: var(--f-body); letter-spacing: 0.35em; text-transform: uppercase;
          font-size: 0.68rem; color: var(--c-accent); margin: 0 0 6px;
        }
        .cover-names { font-family: var(--f-script); color: var(--c-primary); margin: 0; line-height: 0.98; font-weight: 700; }
        .cover-names span { display: block; font-size: clamp(2.4rem, 9vw, 3.5rem); }
        .cover-names em { font-family: var(--f-serif); font-style: italic; font-size: 1rem; color: var(--c-accent); }
        .cover-date { font-family: var(--f-serif); color: var(--c-ink-soft); font-size: 1.1rem; margin: 0 0 2px; }
        .cover-invite { font-family: var(--f-serif); color: var(--c-ink); font-size: 1.2rem; margin: 2px 0 14px; }
        .open-btn {
          position: relative; overflow: hidden;
          font-family: var(--f-serif); font-size: 1.1rem; font-weight: 600; padding: 11px 38px;
        }
        .open-btn .shine {
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: shine 2.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
