import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Trân trọng báo tin — Lễ thành hôn: chú rể & cô dâu, nơi & giờ cử hành. */
export default function Ceremony({ data }) {
  const { groom, bride, ceremony } = data

  return (
    <section className="section ceremony">
      <Reveal>
        <p className="announce">TRÂN TRỌNG BÁO TIN</p>
        <SectionTitle label={labels.ceremony} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="couple">
        <div className="person">
          <span className="role">{groom.role}</span>
          <h3>{groom.name}</h3>
        </div>
        <div className="amp">&amp;</div>
        <div className="person">
          <span className="role">{bride.role}</span>
          <h3>{bride.name}</h3>
        </div>
      </Reveal>

      <Reveal className="panel when">
        <p className="when-place">Hôn lễ được cử hành tại</p>
        <p className="when-place-name">{ceremony.place}</p>

        <div className="when-date">
          <div className="wd-col">
            <span className="wd-top">Vào lúc</span>
            <strong>{ceremony.time}</strong>
          </div>
          <div className="wd-sep" />
          <div className="wd-col">
            <span className="wd-top">{ceremony.weekday}</span>
            <strong>{ceremony.day}</strong>
          </div>
          <div className="wd-sep" />
          <div className="wd-col">
            <span className="wd-top">Tháng {ceremony.month}</span>
            <strong>{ceremony.year}</strong>
          </div>
        </div>
        <p className="lunar">({ceremony.lunar})</p>
      </Reveal>

      <style>{`
        .ceremony { text-align: center; }
        .announce { letter-spacing: 0.25em; color: var(--c-ink-soft); font-size: 0.8rem; margin: 0 0 6px; }
        .couple { margin: 8px 0 28px; }
        .couple .role { font-size: 0.8rem; letter-spacing: 0.18em; color: var(--c-accent); }
        .couple h3 { font-family: var(--f-script); font-size: 2.5rem; line-height: 1.05; color: var(--c-primary); margin: 4px 0; font-weight: 700; }
        .couple .amp { font-family: var(--f-serif); font-style: italic; color: var(--c-accent); font-size: 1.4rem; margin: 6px 0; }
        .when-place { color: var(--c-ink-soft); margin: 0; font-size: 0.95rem; }
        .when-place-name { font-family: var(--f-serif); font-size: 1.35rem; color: var(--c-primary); margin: 6px 0 18px; }
        .when-date { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .wd-col { display: flex; flex-direction: column; min-width: 62px; }
        .wd-col .wd-top { font-size: 0.72rem; letter-spacing: 0.12em; color: var(--c-ink-soft); text-transform: uppercase; }
        .wd-col strong { font-family: var(--f-serif); font-size: 1.9rem; color: var(--c-primary); }
        .wd-sep { width: 1px; height: 40px; background: var(--c-accent); opacity: 0.5; }
        .lunar { color: var(--c-ink-soft); font-style: italic; font-size: 0.85rem; margin: 14px 0 0; }
      `}</style>
    </section>
  )
}
