import { Reveal } from '../common'

/** Lời cảm ơn cuối thiệp + tên đôi + credit. */
export default function ThankYou({ data }) {
  const { groom, bride, thankYou } = data
  return (
    <section className="section ty">
      <Reveal>
        <div className="ty-heart float" aria-hidden>♥</div>
        <p className="ty-msg">{thankYou}</p>
        <h3 className="ty-names">{groom.shortName} &amp; {bride.shortName}</h3>
        <p className="ty-credit">Made with ♡</p>
      </Reveal>

      <style>{`
        .ty { text-align: center; padding-bottom: calc(var(--gap) + 10px); }
        .ty-heart {
          width: 54px; height: 54px; margin: 0 auto 18px; border-radius: 50%;
          background: var(--c-primary); color: var(--c-cream);
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .ty-msg { font-family: var(--f-serif); color: var(--c-ink); font-size: 1.15rem; max-width: 320px; margin: 0 auto 22px; line-height: 1.6; }
        .ty-names { font-family: var(--f-script); color: var(--c-primary); font-size: 2.8rem; line-height: 1.1; margin: 0 0 6px; font-weight: 700; }
        .ty-credit { color: var(--c-ink-soft); font-size: 0.8rem; letter-spacing: 0.1em; }
      `}</style>
    </section>
  )
}
