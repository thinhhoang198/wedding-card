import FallingPetals from './FallingPetals'

/**
 * Màn Cover full-screen (không cuộn). Card ~600×420 với hoạ tiết hoa.
 * Vào: card hiện dần → 2 bó hoa hiện → tên bay 2 bên (mượt, ~2.8s).
 * Khi bấm "Mở thiệp" (closing=true): vòng echo lan toả (không sáng loá) →
 * thiệp bay nhẹ lên & mờ dần → sau đó thiệp chính hiện ra.
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
        <span className="flower flower-l" aria-hidden>
          <img className="flower-img" src="/decor/flower.webp" alt="" />
        </span>
        <span className="flower flower-r" aria-hidden>
          <img className="flower-img" src="/decor/flower.webp" alt="" />
        </span>

        <div className="cover-inner">
          <div className="seal float" aria-hidden>♥</div>
          <p className="cover-sub">Save The Date</p>
          <h1 className="cover-names">
            <span className="cn-groom">{groom.shortName}</span>
            <em>&amp;</em>
            <span className="cn-bride">{bride.shortName}</span>
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

        /* ---- Trạng thái đóng: echo lan toả → thiệp bay lên nhẹ → mờ dần ---- */
        .cover.is-closing { animation: coverFadeLate 2.1s ease forwards; pointer-events: none; }
        .cover.is-closing .cover-card {
          animation: cardLift 1.7s cubic-bezier(0.4, 0, 0.2, 1) 0.45s forwards;
        }
        .cover.is-closing .cover-inner { animation: innerFade 0.7s ease 0.3s forwards; }
        /* echo theo ĐÚNG HÌNH BÓNG HOA: 2 lớp bóng lan ra & mờ dần (không sáng, không xoay) */
        .cover.is-closing .flower::before { animation: flowerEcho 1.25s cubic-bezier(0.22, 0.61, 0.36, 1) 0.05s forwards; }
        .cover.is-closing .flower::after  { animation: flowerEcho 1.25s cubic-bezier(0.22, 0.61, 0.36, 1) 0.32s forwards; }

        @keyframes coverFadeLate { 0%, 60% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes cardLift {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          10% { transform: translateY(10px) scale(0.995); }   /* nhún nhẹ lấy đà */
          100% { transform: translateY(-130vh) scale(0.82); opacity: 0; }
        }
        @keyframes innerFade { to { opacity: 0.25; } }

        /* Echo hoa: bóng hoa phóng to dần từ chính nó rồi mờ đi (theo viền hoa) */
        @keyframes flowerEcho {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        /* ---- Animation VÀO lúc mới hiện: card → 2 bó hoa → tên bay 2 bên (~2s) ----
           Chỉ animate CARD & phần tử con, KHÔNG animate nền .cover (tránh lộ nền khi tải).
           Dùng animation-fill 'backwards' để giữ transform gốc (hoa phải lật gương). */
        .cover-card { animation: coverCardIn 1.15s cubic-bezier(0.33, 1, 0.68, 1) 0.15s backwards; }
        @keyframes coverCardIn {
          from { opacity: 0; transform: translateY(22px) scale(0.975); }
          to { opacity: 1; transform: none; }
        }
        .flower { animation: coverIn 1.1s ease-out 0.85s backwards; }
        .cover-names .cn-groom { animation: flyInLeft 1.2s cubic-bezier(0.33, 1, 0.68, 1) 1.45s backwards; }
        .cover-names .cn-bride { animation: flyInRight 1.2s cubic-bezier(0.33, 1, 0.68, 1) 1.62s backwards; }
        .cover-names em { animation: coverIn 0.9s ease 1.6s backwards; }
        @media (prefers-reduced-motion: reduce) {
          .cover-card, .flower,
          .cover-names .cn-groom, .cover-names .cn-bride, .cover-names em { animation: none; }
        }

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

        /* hoa trang trí 2 góc dưới (khung bọc để chồng lớp echo theo hình hoa) */
        .flower {
          position: absolute; bottom: -2px; z-index: 1;
          height: min(66%, 320px); aspect-ratio: 811 / 1938;
          pointer-events: none; user-select: none;
        }
        .flower-img {
          display: block; width: 100%; height: 100%; object-fit: contain;
          position: relative; z-index: 1;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.18));
        }
        .flower-l { left: -10px; }
        .flower-r { right: -10px; transform: scaleX(-1); } /* lật gương cả khung (cả echo), KHÔNG xoay */
        @media (max-width: 420px) { .flower { height: 56%; } }

        /* 2 lớp "bóng hoa" nằm sau hoa thật, dùng mask để đúng viền hoa;
           khi mở sẽ phóng to dần từ chính nó rồi mờ đi = echo theo hình hoa */
        .flower::before, .flower::after {
          content: ''; position: absolute; inset: 0; z-index: 0;
          background: var(--c-primary-soft);
          -webkit-mask: url('/decor/flower.webp') no-repeat center / contain;
          mask: url('/decor/flower.webp') no-repeat center / contain;
          transform-origin: center bottom;
          opacity: 0; pointer-events: none;
        }

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
