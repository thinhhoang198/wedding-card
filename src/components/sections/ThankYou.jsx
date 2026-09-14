import { Reveal } from '../common'
import { useParallax } from '../../hooks/useParallax'

/** Lời cảm ơn cuối thiệp + tên đôi + credit. */
export default function ThankYou({ data }) {
  const { groom, bride, thankYou } = data
  const photoRef = useParallax({ speed: 0.22, scale: 1.25 })
  return (
    <section className="section ty">
      <Reveal variant="zoom">
        <div className="ty-photo pf">
          <img ref={photoRef} src={data.photos.thankYou} alt="" onError={(e) => { e.currentTarget.style.opacity = 0 }} />
          <span className="pf-hint">Ảnh cưới</span>
        </div>
        <div className="ty-heart float" aria-hidden>♥</div>
        <p className="ty-msg">{thankYou}</p>
        <h3 className="ty-names">{groom.shortName} &amp; {bride.shortName}</h3>
        <p className="ty-credit">Made with ♡</p>
      </Reveal>

      <style>{`
        .ty { text-align: center; padding-bottom: calc(var(--gap) + 10px); }
        .ty-photo {
          width: min(260px, 66%); aspect-ratio: 1; margin: 0 auto 22px;
          border-radius: 50%; border: 3px solid var(--c-accent);
          box-shadow: 0 12px 26px rgba(74, 58, 40,0.2);
        }
        .ty-heart {
          width: 54px; height: 54px; margin: 0 auto 18px; border-radius: 50%;
          background: var(--c-primary); color: var(--c-cream);
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .ty-msg { font-family: var(--f-serif); color: var(--c-ink); font-size: 1.15rem; max-width: 320px; margin: 0 auto 22px; line-height: 1.6; }
        .ty-names { font-family: var(--f-script); color: var(--c-primary); font-size: clamp(1.8rem, 6.6vw, 2.5rem); line-height: 1.15; margin: 0 0 6px; font-weight: 500; }
        .ty-credit { color: var(--c-ink-soft); font-size: 0.8rem; letter-spacing: 0.1em; }
      `}</style>
    </section>
  )
}
