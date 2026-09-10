import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Thông tin hai bên gia đình: nhà trai / nhà gái. */
export default function CoupleInfo({ data }) {
  const { families } = data
  const sides = [
    { key: 'groom', title: 'NHÀ TRAI', info: families.groom },
    { key: 'bride', title: 'NHÀ GÁI', info: families.bride },
  ]

  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.weddingInfo} bilingual={data.bilingual} />
      </Reveal>

      <div className="fam-grid">
        {sides.map((s) => (
          <Reveal key={s.key} className="panel fam">
            <h3>{s.title}</h3>
            <p>{s.info.father}</p>
            <p>{s.info.mother}</p>
            {s.info.address ? <p className="fam-addr">{s.info.address}</p> : null}
          </Reveal>
        ))}
      </div>

      <style>{`
        .fam-grid { display: grid; gap: 18px; max-width: 720px; margin: 0 auto; }
        @media (min-width: 640px) { .fam-grid { grid-template-columns: 1fr 1fr; } }
        .fam { text-align: center; width: 100%; max-width: none; }
        .fam h3 {
          font-family: var(--f-body); letter-spacing: 0.2em;
          color: var(--c-accent); font-size: 0.85rem; margin: 0 0 12px;
        }
        .fam p { margin: 4px 0; font-family: var(--f-serif); font-size: 1.15rem; color: var(--c-ink); }
        .fam-addr { color: var(--c-ink-soft) !important; font-size: 0.95rem !important; margin-top: 8px !important; }
      `}</style>
    </section>
  )
}
