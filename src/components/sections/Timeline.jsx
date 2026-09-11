import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Lịch trình ngày cưới: các mốc giờ theo trục dọc. */
export default function Timeline({ data }) {
  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.timeline} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="tl" variant="left">
        {data.timeline.map((item, i) => (
          <div className="tl-row" key={i}>
            <div className="tl-time">{item.time}</div>
            <div className="tl-dot" aria-hidden />
            <div className="tl-label">{item.label}</div>
          </div>
        ))}
      </Reveal>

      <style>{`
        .tl { max-width: 340px; margin: 0 auto; position: relative; }
        /* Đường dọc đặt đúng tâm cột chấm: 64px (giờ) + 8px (gap) + 12px (nửa 24px) = 84px */
        .tl::before {
          content: ''; position: absolute; left: 84px; top: 12px; bottom: 12px;
          width: 2px; transform: translateX(-50%);
          background: linear-gradient(var(--c-accent), rgba(201,161,90,0.25));
        }
        .tl-row { display: grid; grid-template-columns: 64px 24px 1fr; align-items: center; gap: 8px; padding: 12px 0; }
        .tl-time { font-family: var(--f-serif); font-size: 1.15rem; color: var(--c-primary); text-align: right; }
        .tl-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--c-primary); border: 3px solid var(--c-cream); box-shadow: 0 0 0 2px var(--c-accent); justify-self: center; position: relative; z-index: 1; }
        .tl-label { color: var(--c-ink); font-size: 1rem; }
      `}</style>
    </section>
  )
}
