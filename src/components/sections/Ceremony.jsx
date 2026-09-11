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

      <Reveal className="couple" variant="zoom">
        <div className="person">
          <div className="photo">
            <img src={groom.photo} alt={groom.name}
                 onError={(e) => { e.currentTarget.style.opacity = 0 }} />
          </div>
          <span className="ptype">Chú Rể</span>
          <h3>{groom.name}</h3>
        </div>
        <div className="amp">&amp;</div>
        <div className="person">
          <div className="photo">
            <img src={bride.photo} alt={bride.name}
                 onError={(e) => { e.currentTarget.style.opacity = 0 }} />
          </div>
          <span className="ptype">Cô Dâu</span>
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
        .couple {
          display: flex; align-items: flex-start; justify-content: center;
          gap: clamp(2px, 1.2vw, 16px); margin: 12px auto 30px; max-width: 600px;
        }
        .person { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; }
        /* Khung ảnh tròn — thả ảnh vào public/couple/ (chưa có sẽ hiện khung trống + ♥) */
        .photo {
          width: clamp(96px, 30vw, 150px); aspect-ratio: 1;
          border-radius: 50%; overflow: hidden; position: relative;
          border: 3px solid var(--c-accent);
          box-shadow: 0 8px 22px rgba(90, 26, 36, 0.28);
          background: linear-gradient(150deg, var(--c-cream-2), #e3d2bd);
          margin-bottom: 12px;
        }
        .photo img { width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 1; }
        .photo::after {
          content: '♥'; position: absolute; inset: 0; z-index: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--c-primary-soft); font-size: 1.9rem; opacity: 0.45;
        }
        .couple .ptype {
          display: block; font-family: var(--f-body);
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--c-accent); font-size: 0.75rem; font-weight: 500;
          margin: 0 0 3px;
        }
        .couple h3 {
          font-family: var(--f-script); font-size: clamp(1.15rem, 4.6vw, 2rem);
          line-height: 1.1; color: var(--c-primary); margin: 0; font-weight: 700;
          white-space: nowrap; /* luôn 1 dòng */
        }
        .couple .amp {
          font-family: var(--f-serif); font-style: italic; color: var(--c-accent);
          font-size: 1.6rem; flex: 0 0 auto;
          margin-top: clamp(40px, 12vw, 66px); /* canh ngang tâm khung ảnh */
        }
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
