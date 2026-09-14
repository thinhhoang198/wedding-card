import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'

/**
 * Dải ảnh full-width kiểu điện ảnh, có lớp phủ nhẹ + câu chú thích (script).
 * Dùng làm "điểm nhấn triển lãm" giữa các mục. Chưa có ảnh → khung placeholder.
 * Ảnh trôi parallax nhẹ theo cuộn trang để tạo chiều sâu.
 */
export default function PhotoBand({ src, caption }) {
  const [ref, shown] = useReveal()
  const photoRef = useParallax({ speed: 0.3, scale: 1.32 })
  const hideImg = (e) => (e.currentTarget.style.opacity = 0)

  return (
    <section className="band-sec">
      <div ref={ref} className={`band pf ${shown ? 'is-in' : ''}`}>
        <img ref={photoRef} src={src} alt="" onError={hideImg} />
        <span className="pf-hint">Ảnh cưới</span>
        <div className="band-overlay" />
        {caption ? <p className="band-caption">{caption}</p> : null}
      </div>

      <style>{`
        .band-sec { padding: 0; margin: clamp(10px, 2.5vw, 22px) 0; }
        .band {
          position: relative;
          width: 100%;
          height: clamp(230px, 46vw, 420px);
        }
        .band > img { opacity: 0; transition: opacity 1.3s ease; will-change: transform; }
        .band.is-in > img { opacity: 1; }
        .band-overlay {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(to top, rgba(42, 30, 16,0.55) 0%, rgba(42, 30, 16,0.05) 45%, rgba(42, 30, 16,0.12) 100%);
        }
        .band-caption {
          position: absolute; left: 0; right: 0; bottom: clamp(16px, 4vw, 30px); z-index: 3;
          margin: 0; padding: 0 20px; text-align: center;
          font-family: var(--f-script); color: #fff;
          font-size: clamp(1.8rem, 7vw, 3rem); line-height: 1.1;
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.33,1,0.68,1) 0.2s;
        }
        .band.is-in .band-caption { opacity: 1; transform: none; }
      `}</style>
    </section>
  )
}
