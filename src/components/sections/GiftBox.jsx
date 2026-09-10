import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/** Hộp quà mừng: bấm để mở popup hiện QR + tài khoản của cô dâu & chú rể. */
export default function GiftBox({ data }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const copy = (text) =>
    navigator.clipboard?.writeText(text).then(
      () => alert('Đã sao chép số tài khoản: ' + text),
      () => {}
    )

  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <Reveal>
        <SectionTitle label={labels.gift} bilingual={data.bilingual} />
      </Reveal>

      <Reveal>
        <button className="gift-box" onClick={() => setOpen(true)}>
          <span className="gift-emoji float">🎁</span>
          <span className="gift-hint">Nhấn để mở</span>
        </button>
      </Reveal>

      {open && createPortal(
        <div className="gm" onClick={() => setOpen(false)}>
          <div className="gm-panel" onClick={(e) => e.stopPropagation()}>
            <button className="gm-close" onClick={() => setOpen(false)} aria-label="Đóng">✕</button>
            <h3 className="gm-title">Hộp Quà Mừng</h3>
            <p className="gm-sub">Cảm ơn tình cảm của quý khách 💝</p>

            <div className="gm-cards">
              {data.gifts.map((g, i) => (
                <div className="gm-card" key={i}>
                  <p className="gc-side">{g.side}</p>
                  <div className="gc-qr">
                    <img src={g.qr} alt={`QR ${g.side}`} onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <p className="gc-bank">{g.bank}</p>
                  <p className="gc-acc">{g.account}</p>
                  <p className="gc-holder">{g.holder}</p>
                  <div className="gc-btns">
                    <button className="btn btn-outline sm" onClick={() => copy(g.account)}>Sao chép STK</button>
                    <a className="btn btn-primary sm" href={g.qr} download={`qr-${g.side}.png`}>Lưu QR</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .gift-box {
          background: var(--c-cream-2); border: 1px dashed var(--c-accent);
          border-radius: var(--radius); padding: 30px 44px; cursor: pointer;
          display: inline-flex; flex-direction: column; align-items: center; gap: 10px;
          transition: transform 0.2s;
        }
        .gift-box:hover { transform: translateY(-3px); }
        .gift-emoji { font-size: 3rem; }
        .gift-hint { color: var(--c-ink-soft); letter-spacing: 0.1em; font-size: 0.9rem; }

        .gm {
          position: fixed; inset: 0; z-index: 1001;
          background: rgba(20, 6, 10, 0.7);
          display: flex; align-items: center; justify-content: center; padding: 18px;
          animation: coverIn 0.25s ease both;
        }
        .gm-panel {
          position: relative;
          width: 100%; max-width: 720px;
          max-height: 90vh; overflow-y: auto;
          background: var(--c-cream);
          border-radius: var(--radius);
          border: 1px solid rgba(201,161,90,0.5);
          padding: 30px 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          animation: mainFade 0.35s ease both;
        }
        .gm-close {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid var(--c-accent); background: transparent;
          color: var(--c-primary); font-size: 18px; cursor: pointer;
        }
        .gm-title { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.7rem; margin: 0 0 4px; }
        .gm-sub { color: var(--c-ink-soft); margin: 0 0 22px; font-size: 0.92rem; }

        .gm-cards { display: grid; gap: 18px; }
        @media (min-width: 620px) { .gm-cards { grid-template-columns: 1fr 1fr; } }
        .gm-card {
          background: var(--c-cream-2); border-radius: 14px; padding: 20px 16px;
          border: 1px solid rgba(201,161,90,0.35);
        }
        .gc-side { font-family: var(--f-body); letter-spacing: 0.15em; color: var(--c-accent); font-size: 0.85rem; margin: 0 0 12px; }
        .gc-qr { width: 160px; height: 160px; margin: 0 auto 12px; background: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(201,161,90,0.4); }
        .gc-qr img { width: 100%; height: 100%; object-fit: contain; }
        .gc-bank { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.15rem; margin: 4px 0; }
        .gc-acc { font-size: 1.15rem; letter-spacing: 0.05em; color: var(--c-ink); margin: 2px 0; }
        .gc-holder { color: var(--c-ink-soft); font-size: 0.9rem; margin: 2px 0 14px; }
        .gc-btns { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .btn.sm { padding: 8px 16px; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; }
      `}</style>
    </section>
  )
}
