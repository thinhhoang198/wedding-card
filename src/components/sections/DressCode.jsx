import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Dress code: gợi ý tông màu trang phục dự tiệc. */
export default function DressCode({ data }) {
  const dc = data.dressCode
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <Reveal variant="zoom">
        <SectionTitle label={labels.dressCode} bilingual={data.bilingual} />
        <p className="dc-note">{dc.note}</p>
        <div className="dc-colors">
          {dc.colors.map((c) => (
            <span key={c} className="swatch" style={{ background: c }} title={c} />
          ))}
        </div>
      </Reveal>

      <style>{`
        .dc-note { color: var(--c-ink-soft); max-width: 320px; margin: 0 auto 22px; font-size: 0.95rem; }
        .dc-colors { display: flex; justify-content: center; gap: 14px; }
        .swatch {
          width: 46px; height: 46px; border-radius: 50%;
          border: 2px solid var(--c-cream); box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  )
}
