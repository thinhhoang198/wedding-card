import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'

/**
 * Album ảnh dạng carousel coverflow: ảnh giữa to & rõ nhất, hai bên nhỏ dần
 * và mờ dần. Bấm ảnh giữa → lightbox phóng to có mũi tên / vuốt / loop.
 */
export default function Gallery({ data }) {
  const photos = data.gallery || []
  const n = photos.length
  const [index, setIndex] = useState(0)
  const [light, setLight] = useState(false)
  const touch = useRef(null)

  // Khoảng cách vòng tròn ngắn nhất từ i tới ảnh đang ở giữa
  const rel = (i) => {
    let d = i - index
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }
  const go = (dir) => setIndex((i) => (i + dir + n) % n)

  // Vuốt trên carousel
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (dx > 40) go(-1)
    else if (dx < -40) go(1)
    touch.current = null
  }

  // Điều hướng lightbox bằng bàn phím + khoá cuộn nền
  useEffect(() => {
    if (!light) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLight(false)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [light, n])

  if (!n) return null

  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.album} bilingual={data.bilingual} />
      </Reveal>

      <Reveal variant="zoom">
        <div className="cf" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="cf-stage">
            {photos.map((src, i) => {
              const d = rel(i)
              const isCenter = d === 0
              const hidden = Math.abs(d) > 2
              return (
                <div
                  key={i}
                  className={`cf-item ${isCenter ? 'is-center' : ''}`}
                  style={{
                    transform: `translateX(calc(-50% + ${d * 56}%)) scale(${1 - Math.abs(d) * 0.16})`,
                    opacity: hidden ? 0 : 1 - Math.abs(d) * 0.38,
                    filter: isCenter ? 'none' : `blur(${Math.abs(d) * 1.2}px)`,
                    zIndex: 100 - Math.abs(d),
                    pointerEvents: hidden ? 'none' : 'auto',
                  }}
                  onClick={() => (isCenter ? setLight(true) : setIndex(i))}
                >
                  <img src={src} alt={`Ảnh cưới ${i + 1}`} loading="lazy"
                       onError={(e) => { e.currentTarget.style.opacity = 0 }} />
                </div>
              )
            })}
          </div>

          <button className="cf-arrow cf-left" onClick={() => go(-1)} aria-label="Ảnh trước">‹</button>
          <button className="cf-arrow cf-right" onClick={() => go(1)} aria-label="Ảnh sau">›</button>
        </div>
      </Reveal>

      <div className="cf-dots">
        {photos.map((_, i) => (
          <button key={i} className={`dot ${i === index ? 'on' : ''}`} onClick={() => setIndex(i)} aria-label={`Ảnh ${i + 1}`} />
        ))}
      </div>

      {light && createPortal(
        <div className="lb" onClick={() => setLight(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="lb-close" onClick={() => setLight(false)} aria-label="Đóng">✕</button>
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Ảnh trước">‹</button>
          <img className="lb-img" src={photos[index]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Ảnh sau">›</button>
          <span className="lb-count">{index + 1} / {n}</span>
        </div>,
        document.body
      )}

      <style>{`
        .cf { position: relative; max-width: 760px; margin: 0 auto; }
        .cf-stage {
          position: relative;
          height: min(60vh, 440px);
          overflow: hidden;
        }
        .cf-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(300px, 66vw);
          aspect-ratio: 3 / 4;
          margin-top: calc(min(300px, 66vw) * -0.66);
          border-radius: 14px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--c-cream-2), #e3d2bd);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s, filter 0.45s;
          cursor: pointer;
        }
        .cf-item img { width: 100%; height: 100%; object-fit: cover; }
        .cf-item.is-center { box-shadow: 0 12px 28px rgba(90,26,36,0.18); }

        .cf-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 200;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--c-cream); color: var(--c-primary);
          border: 1px solid var(--c-accent); font-size: 24px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }
        .cf-left { left: 4px; } .cf-right { right: 4px; }

        .cf-dots { display: flex; justify-content: center; gap: 8px; margin-top: 18px; }
        .cf-dots .dot {
          width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer;
          background: rgba(201,161,90,0.45); transition: all 0.25s;
        }
        .cf-dots .dot.on { background: var(--c-primary); width: 22px; border-radius: 4px; }

        .lb {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(20, 6, 10, 0.94);
          display: flex; align-items: center; justify-content: center;
          animation: coverIn 0.25s ease both;
        }
        .lb-img { max-width: 90vw; max-height: 82vh; border-radius: 8px; }
        .lb-close { position: absolute; top: 18px; right: 18px; }
        .lb-close, .lb-nav {
          background: rgba(255,255,255,0.14); color: #fff; border: none;
          width: 48px; height: 48px; border-radius: 50%; font-size: 26px; cursor: pointer;
        }
        .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); }
        .lb-prev { left: 12px; } .lb-next { right: 12px; }
        .lb-count { position: absolute; bottom: 24px; color: #fff; letter-spacing: 0.1em; font-size: 0.9rem; }
      `}</style>
    </section>
  )
}
