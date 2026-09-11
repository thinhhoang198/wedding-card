import { Fragment } from 'react'
import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Thông tin hai bên gia đình — gộp trong MỘT khung liền mạch (nhà trai · nhà gái). */
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

      <Reveal className="winfo" variant="zoom">
        <div className="winfo-inner">
          {sides.map((s, i) => (
            <Fragment key={s.key}>
              <div className="winfo-side">
                <h3>{s.title}</h3>
                <p>{s.info.father}</p>
                <p>{s.info.mother}</p>
                {s.info.address ? <p className="winfo-addr">{s.info.address}</p> : null}
              </div>
              {i === 0 && (
                <div className="winfo-sep" aria-hidden>
                  <span>❦</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>

      <style>{`
        .winfo {
          position: relative;
          max-width: 560px; margin: 0 auto;
          border: 1px solid rgba(201, 161, 90, 0.65);
          border-radius: 18px;
          background: var(--c-cream-2);
          padding: clamp(26px, 5vw, 38px) clamp(20px, 4vw, 32px);
          box-shadow: 0 12px 30px rgba(90, 26, 36, 0.1);
        }
        /* viền đôi mảnh bên trong cho cảm giác thiệp trang trọng */
        .winfo::before {
          content: ''; position: absolute; inset: 7px;
          border: 1px solid rgba(201, 161, 90, 0.35);
          border-radius: 12px; pointer-events: none;
        }
        .winfo-inner {
          position: relative;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: clamp(12px, 3vw, 24px);
        }
        .winfo-side { text-align: center; }
        .winfo-side h3 {
          font-family: var(--f-body); letter-spacing: 0.2em;
          color: var(--c-accent); font-size: 0.85rem; margin: 0 0 12px;
        }
        .winfo-side p { margin: 5px 0; font-family: var(--f-serif); font-size: 1.18rem; color: var(--c-ink); line-height: 1.4; }
        .winfo-addr { color: var(--c-ink-soft) !important; font-size: 0.92rem !important; margin-top: 8px !important; }

        /* vạch ngăn giữa 2 nhà + hoa văn ❦ ở tâm */
        .winfo-sep {
          align-self: stretch; width: 1px; justify-self: center;
          background: linear-gradient(transparent, var(--c-accent) 20%, var(--c-accent) 80%, transparent);
          display: flex; align-items: center; justify-content: center;
        }
        .winfo-sep span {
          background: var(--c-cream-2); color: var(--c-accent);
          font-size: 0.95rem; line-height: 1; padding: 6px 2px;
        }

        @media (max-width: 540px) {
          .winfo-inner { grid-template-columns: 1fr; gap: 0; }
          .winfo-sep {
            width: 62%; height: 1px; margin: 14px auto;
            background: linear-gradient(90deg, transparent, var(--c-accent), transparent);
          }
          .winfo-sep span { background: transparent; padding: 0 8px; }
        }
      `}</style>
    </section>
  )
}
