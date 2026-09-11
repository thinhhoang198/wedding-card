import { useState } from 'react'
import Reception from './sections/Reception'
import Rsvp from './sections/Rsvp'

/**
 * Khu vực Tiệc cưới có 2 tab (2 địa điểm: Hà Nội / Nha Trang).
 * Chọn tab sẽ đổi thông tin Tiệc cưới + Xác nhận tham dự tương ứng.
 * Nền ảnh mờ dùng chung cho cả khu.
 */
export default function PartySection({ data }) {
  const events = data.events
  const [idx, setIdx] = useState(0)
  const ev = events[idx]

  return (
    <div className="party-bg">
      <div
        className="party-bg-img"
        style={{ backgroundImage: `url(${data.photos.partyBg})` }}
        aria-hidden
      />

      <div className="party-tabs-wrap">
        <p className="party-tabs-note">Tiệc cưới được tổ chức tại 2 nơi — chọn nơi bạn tham dự</p>
        <div className="party-tabs" role="tablist">
          {events.map((e, i) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={i === idx}
              className={`ptab ${i === idx ? 'on' : ''}`}
              onClick={() => setIdx(i)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* key={ev.id} để 2 mục re-mount + chạy lại animation khi đổi tab */}
      <Reception key={'rec-' + ev.id} data={data} event={ev} />
      <Rsvp key={'rsvp-' + ev.id} data={data} event={ev} />

      <style>{`
        .party-tabs-wrap { position: relative; z-index: 1; text-align: center; padding: clamp(28px, 5vw, 44px) 20px 0; }
        .party-tabs-note { color: var(--c-ink-soft); font-size: 0.9rem; margin: 0 0 14px; }
        .party-tabs {
          display: inline-flex; gap: 6px; padding: 5px;
          background: var(--c-cream-2); border: 1px solid rgba(201,161,90,0.5);
          border-radius: 999px; box-shadow: 0 6px 16px rgba(90,26,36,0.08);
        }
        .ptab {
          border: none; cursor: pointer;
          font-family: var(--f-body); font-size: 0.95rem; font-weight: 500;
          padding: 9px 26px; border-radius: 999px;
          background: transparent; color: var(--c-ink-soft);
          transition: background 0.25s ease, color 0.25s ease;
        }
        .ptab.on { background: var(--c-primary); color: var(--c-cream); box-shadow: 0 4px 12px rgba(90,26,36,0.3); }
        /* mục ngay dưới thanh tab bớt padding-top cho gọn */
        .party-tabs-wrap + .section { padding-top: clamp(18px, 3vw, 26px); }
      `}</style>
    </div>
  )
}
