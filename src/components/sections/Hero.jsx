import { Reveal } from '../common';
import { useParallax } from '../../hooks/useParallax';

/** Hero: tên đôi uyên ương cỡ lớn + ngày cưới (mở đầu nội dung). */
export default function Hero({ data, eventIdx }) {
  const { groom, bride, events } = data;
  const date = events[eventIdx];
  const photoRef = useParallax({ speed: 0.24, scale: 1.25 });
  return (
    <section className="section hero">
      <Reveal variant="fade">
        <p className="hero-sub">The Wedding of</p>
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
            ref={photoRef}
            src={data.photos.hero}
            alt=""
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
          <span className="pf-hint">Ảnh cưới</span>
        </div>

        <img
          className="deco deco-hero-l deco-over"
          src="/decor/decor3-clean.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="deco deco-hero-r deco-mirror deco-over"
          src="/decor/decor5-clean.png"
          alt=""
          aria-hidden="true"
        />
      </Reveal>

      <style>{`
        .hero { text-align: center; padding-top: calc(var(--gap) + 20px); }

        /* Hero là mục đầu tiên nên IntersectionObserver của Reveal bắn "is-visible" gần
           như ngay khi mount — tức là lúc màn Cover còn đang che kín màn hình. Vì vậy ta
           bỏ qua timing mặc định của .reveal (transition tức thời, vô hình vì bị Cover che)
           và tự biên đạo lại từng phần tử bằng animation-delay riêng, canh đúng lúc nền
           Cover mờ dần đi (~1.2s → 2.3s sau khi bấm "Mở thiệp") để phần Hero "nổ" ra sống
           động ngay trước mắt người xem, thay vì đã hiện xong từ lúc còn bị che khuất. */
        .hero .reveal { opacity: 1; transform: none; transition: none; }

        .hero-photo-wrap {
          margin: clamp(22px, 4vw, 34px) auto 0;
          width: min(480px, 92%);
          position: relative; z-index: 0;
        }
        .deco-hero-l {
          width: clamp(74px, 17vw, 132px);
          left: clamp(-22px, -5vw, -8px); bottom: clamp(-30px, -6vw, -16px);
        }
        .deco-hero-r {
          width: clamp(58px, 13vw, 100px);
          right: clamp(-18px, -4vw, -6px); bottom: clamp(-24px, -5vw, -12px);
        }
        .hero-photo {
          width: 100%; aspect-ratio: 4 / 5;
          border-radius: 999px 999px 20px 20px;
          border: 3px solid var(--c-accent);
          box-shadow: 0 20px 46px rgba(74, 58, 40,0.28);
          position: relative; overflow: hidden;
          animation: heroPhotoIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.3s both;
        }
        .hero-photo::after {
          content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.55) 50%, transparent 58%);
          transform: translateX(-130%);
          animation: heroShine 1.1s ease 2.35s 1;
        }
        @keyframes heroPhotoIn {
          0% { opacity: 0; transform: scale(0.72) rotate(-7deg); }
          65% { opacity: 1; }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes heroShine {
          to { transform: translateX(130%); }
        }

        .hero-sub {
          letter-spacing: 0.4em; text-transform: uppercase;
          font-size: 0.72rem; color: var(--c-accent); margin: 0 0 16px;
          opacity: 0;
          animation: heroDropIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) 1.05s both;
        }
        .hero-names {
          font-family: var(--f-script); color: var(--c-primary);
          margin: 0; font-weight: 500; line-height: 1.05;
        }
        .hero-names span { display: block; font-size: clamp(3rem, 14vw, 4.6rem); }
        .hero-names em {
          font-family: var(--f-serif); font-style: italic; color: var(--c-accent); font-size: 1.4rem;
          opacity: 0;
          animation: heroPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.85s both;
        }

        /* Tên bay vào từ 2 bên, canh đúng lúc nền Cover bắt đầu mờ đi */
        .hero-names .n-groom, .hero-names .n-bride { opacity: 0; }
        .hero-names .n-groom {
          animation: flyInLeft 1s cubic-bezier(0.22, 1, 0.36, 1) 1.35s both;
        }
        .hero-names .n-bride {
          animation: flyInRight 1s cubic-bezier(0.22, 1, 0.36, 1) 1.55s both;
        }

        .hero .divider {
          opacity: 0;
          animation: heroPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 2s both;
        }
        @keyframes heroPop {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }

        .hero-date {
          font-family: var(--f-serif); color: var(--c-ink-soft); font-size: 1.2rem;
          opacity: 0;
          animation: heroDropIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) 2.15s both;
        }
        @keyframes heroDropIn {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-names .n-groom, .hero-names .n-bride,
          .hero-sub, .hero-names em, .hero .divider, .hero-date, .hero-photo {
            opacity: 1; animation: none; transform: none;
          }
          .hero-photo::after { display: none; }
        }
      `}</style>
    </section>
  );
}
