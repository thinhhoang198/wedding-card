import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/**
 * Icon dạng nét mảnh (line-art), vẽ tay bằng SVG — không phụ thuộc thư viện
 * ngoài, để giữ đúng phong cách thanh lịch trắng-vàng của thiệp và tô màu
 * được theo currentColor.
 */
const ICONS = {
  guests: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.6" cy="8.2" r="2.6" />
      <path d="M3.6 19c0-3.1 2.2-5.2 5-5.2s5 2.1 5 5.2" />
      <circle cx="16.6" cy="9.3" r="2.1" />
      <path d="M14.9 12.6c2.4.3 4.1 2.2 4.1 4.7" />
    </svg>
  ),
  car: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v-2.4c0-.5.2-1 .6-1.3l1.7-1.6c.3-.3.7-.5 1.1-.5h9.2c.4 0 .8.2 1.1.5l1.7 1.6c.4.3.6.8.6 1.3V16" />
      <path d="M3 16h18v1.6a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1V17H6.2v.6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V16Z" />
      <circle cx="7.5" cy="16.2" r="1.3" />
      <circle cx="16.5" cy="16.2" r="1.3" />
      <path d="M12 8.2v-2M10.3 6.6h3.4" />
    </svg>
  ),
  camera: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6.5 10 4.5h4l1 2h2.5A1.5 1.5 0 0 1 19 8v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17V8a1.5 1.5 0 0 1 1.5-1.5H9Z" />
      <circle cx="12" cy="12.3" r="3.4" />
    </svg>
  ),
  bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.6c-2.7 0-4.3 2-4.3 4.9v3.1c0 .9-.3 1.7-.9 2.3l-.9.9h12.2l-.9-.9a3.1 3.1 0 0 1-.9-2.3V8.5c0-2.9-1.6-4.9-4.3-4.9Z" />
      <path d="M10.1 18.4a1.9 1.9 0 0 0 3.8 0" />
    </svg>
  ),
  rings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="8.6" cy="14.6" r="4" />
      <circle cx="15.4" cy="14.6" r="4" />
      <path
        d="M12 4.6l.8 1.8 1.9.3-1.4 1.3.3 1.9-1.6-.9-1.6.9.3-1.9-1.4-1.3 1.9-.3.8-1.8Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  cake: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 20v-6.2c0-.9.7-1.6 1.6-1.6h11.8c.9 0 1.6.7 1.6 1.6V20Z" />
      <path d="M4.5 20h14.9M4.5 16.3c1.3 1 2.6 1 3.9 0s2.6-1 3.9 0 2.6 1 3.9 0" />
      <path d="M9.3 12.2V9.6M14.7 12.2V9.6" />
      <path d="M9.3 9.6c-.8 0-1.2-.6-1.2-1.2S8.5 7.2 9.3 7.2s1.2.6 1.2 1.2-.4 1.2-1.2 1.2ZM14.7 9.6c-.8 0-1.2-.6-1.2-1.2s.4-1.2 1.2-1.2 1.2.6 1.2 1.2-.4 1.2-1.2 1.2Z" />
    </svg>
  ),
  moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.2 14.7A7.1 7.1 0 1 1 10.1 4a5.7 5.7 0 0 0 8.1 10.7Z" />
    </svg>
  ),
  heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19.8s-6.4-4.1-8.7-8C1.9 8.3 3.5 5 6.7 5c2 0 3.3 1.2 3.9 2.3.6-1.1 1.9-2.3 3.9-2.3 3.2 0 4.8 3.3 3.4 6.8-2.3 3.9-8.7 8-8.7 8Z" />
    </svg>
  ),
}

/** Đoán icon phù hợp theo nội dung mốc lịch trình — tự hoạt động cả khi bạn đổi/thêm mốc. */
function pickIcon(label = '') {
  const s = label.toLowerCase()
  if (s.includes('đón dâu') || s.includes('rước dâu')) return ICONS.car
  if (s.includes('chụp ảnh') || s.includes('chụp hình')) return ICONS.camera
  if (s.includes('đón khách') || s.includes('chào đón') || s.includes('tiếp khách')) return ICONS.guests
  if (s.includes('khai tiệc') || s.includes('khai mạc') || s.includes('bắt đầu')) return ICONS.bell
  if (s.includes('nghi thức') || s.includes('trao nhẫn') || s.includes('thề') || s.includes('làm lễ')) return ICONS.rings
  if (s.includes('cắt bánh') || s.includes('nâng ly') || s.includes('champagne') || s.includes('khai rượu')) return ICONS.cake
  if (s.includes('kết thúc') || s.includes('tan tiệc') || s.includes('chia tay') || s.includes('bế mạc')) return ICONS.moon
  return ICONS.heart
}

// Xoay vòng vài sắc trong đúng bảng màu trắng-vàng của thiệp, để mỗi mốc có
// điểm nhấn riêng mà không lệch tông (a67c1f là vàng đậm dùng lại từ lịch tháng).
const TL_COLORS = ['var(--c-primary)', '#a67c1f', 'var(--c-primary-soft)', 'var(--c-ink-soft)', 'var(--c-accent)']

/** Lịch trình ngày cưới: các mốc giờ — dọc trên mobile, dàn ngang trên desktop. */
export default function Timeline({ data }) {
  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.timeline} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="tl" variant="left">
        <div className="tl-track">
          {data.timeline.map((item, i) => {
            const Icon = pickIcon(item.label)
            const color = TL_COLORS[i % TL_COLORS.length]
            return (
              <div className="tl-step" key={i}>
                <div className="tl-icon" style={{ '--tl-color': color }}>
                  <Icon />
                </div>
                <div className="tl-time">{item.time}</div>
                <div className="tl-label">{item.label}</div>
              </div>
            )
          })}
        </div>
      </Reveal>

      <style>{`
        .tl { max-width: 340px; margin: 0 auto; }

        /* ---- Mobile/mặc định: xếp dọc, icon + đường nối bên trái ---- */
        .tl-track { position: relative; }
        .tl-track::before {
          content: ''; position: absolute; left: 25px; top: 6px; bottom: 6px;
          width: 2px; transform: translateX(-50%);
          background: linear-gradient(var(--c-accent), rgba(201,161,90,0.25));
        }
        .tl-step {
          position: relative;
          display: grid; grid-template-columns: 52px 1fr; grid-template-rows: auto auto;
          column-gap: 16px; row-gap: 2px; align-items: center; padding: 12px 0;
        }
        .tl-icon {
          grid-row: 1 / span 2;
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--c-cream); color: var(--tl-color, var(--c-primary));
          border: 2px solid var(--tl-color, var(--c-accent));
          box-shadow: 0 4px 12px rgba(74, 58, 40, 0.16);
          position: relative; z-index: 1;
        }
        .tl-icon svg { width: 24px; height: 24px; }
        .tl-time { font-family: var(--f-serif); font-size: 1.1rem; font-weight: 600; color: var(--c-primary); }
        .tl-label { color: var(--c-ink); font-size: 0.95rem; }

        /* ---- Desktop: dàn ngang, icon ở trên + đường nối chạy ngang ---- */
        @media (min-width: 900px) {
          .tl { max-width: 920px; }
          .tl-track {
            display: flex; align-items: flex-start; justify-content: space-between;
            gap: 6px;
          }
          .tl-track::before {
            left: 0; right: 0; top: 26px; bottom: auto; height: 2px; width: auto;
            transform: none;
            background: linear-gradient(90deg, rgba(201,161,90,0.2), var(--c-accent) 15%, var(--c-accent) 85%, rgba(201,161,90,0.2));
          }
          .tl-step {
            display: flex; flex-direction: column; align-items: center; text-align: center;
            flex: 1 1 0; min-width: 0; padding: 0; gap: 10px;
          }
          .tl-time { order: 2; }
          .tl-label { order: 3; max-width: 128px; line-height: 1.35; }
        }
      `}</style>
    </section>
  )
}
