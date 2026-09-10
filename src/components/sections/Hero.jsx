import { Reveal } from '../common'

/** Hero: tên đôi uyên ương cỡ lớn + ngày cưới (mở đầu nội dung). */
export default function Hero({ data }) {
  const { groom, bride, weddingDate } = data
  return (
    <section className="section hero">
      <Reveal>
        <p className="hero-sub">Save The Date</p>
        <h1 className="hero-names">
          <span>{groom.shortName}</span>
          <em>&amp;</em>
          <span>{bride.shortName}</span>
        </h1>
        <div className="divider" aria-hidden>❦</div>
        <p className="hero-date">{weddingDate.weekday}, {weddingDate.solar}</p>
      </Reveal>

      <style>{`
        .hero { text-align: center; padding-top: calc(var(--gap) + 20px); }
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
        .hero-date { font-family: var(--f-serif); color: var(--c-ink-soft); font-size: 1.2rem; }
      `}</style>
    </section>
  )
}
