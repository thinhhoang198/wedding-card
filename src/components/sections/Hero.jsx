import { Reveal } from '../common';

/** Hero: tên đôi uyên ương cỡ lớn + ngày cưới (mở đầu nội dung). */
export default function Hero({ data, eventIdx }) {
  const { groom, bride, events } = data;
  const date = events[eventIdx];
  return (
    <section className="section hero">
      <Reveal variant="fade">
        <p className="hero-sub">Save The Date</p>
        <h1 className="hero-names">
          <span className="n-groom">{groom.shortName}</span>
          <em>&amp;</em>
          <span className="n-bride">{bride.shortName}</span>
        </h1>
        <div className="divider" aria-hidden>
          ❦
        </div>
        <p className="hero-date">
          {date.weekday}, {date.day} tháng {date.month} năm {date.year}
        </p>
      </Reveal>

      <Reveal variant="zoom" className="hero-photo-wrap">
        <div className="hero-photo pf">
          <img
            src={data.photos.hero}
            alt=""
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
          <span className="pf-hint">Ảnh cưới</span>
        </div>
      </Reveal>

      <style>{`
        .hero { text-align: center; padding-top: calc(var(--gap) + 20px); }
        .hero-photo-wrap { margin-top: clamp(22px, 4vw, 34px); }
        .hero-photo {
          width: min(480px, 92%); aspect-ratio: 4 / 5; margin: 0 auto;
          border-radius: 999px 999px 20px 20px;
          border: 3px solid var(--c-accent);
          box-shadow: 0 20px 46px rgba(90,26,36,0.28);
        }
        .hero-sub {
          letter-spacing: 0.4em; text-transform: uppercase;
          font-size: 0.72rem; color: var(--c-accent); margin: 0 0 16px;
        }
        .hero-names {
          font-family: var(--f-script); color: var(--c-primary);
          margin: 0; font-weight: 700; line-height: 1;
        }
        .hero-names span { display: block; font-size: clamp(3.2rem, 17vw, 4.8rem); }
        .hero-names em { font-family: var(--f-serif); font-style: italic; color: var(--c-accent); font-size: 1.4rem; }

        /* Tên bay vào từ 2 bên khi hero hiện ra */
        .hero-names .n-groom, .hero-names .n-bride { opacity: 0; }
        .reveal.is-visible .hero-names .n-groom {
          animation: flyInLeft 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
        }
        .reveal.is-visible .hero-names .n-bride {
          animation: flyInRight 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.32s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-names .n-groom, .hero-names .n-bride { opacity: 1; animation: none; }
        }
        .hero-date { font-family: var(--f-serif); color: var(--c-ink-soft); font-size: 1.2rem; }
      `}</style>
    </section>
  );
}
