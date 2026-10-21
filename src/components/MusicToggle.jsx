import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

/**
 * Nhạc nền + nút dừng/phát cố định góc phải trên.
 * ref được App dùng để gọi .play() ngay trong cú bấm chọn Hà Nội / Nha Trang
 * (trình duyệt chỉ cho phát nhạc khi có thao tác của người dùng).
 */
const MusicToggle = forwardRef(function MusicToggle({ src, visible }, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Cho App gọi audioRef.current.play()
  useImperativeHandle(ref, () => audioRef.current)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }

  const label = playing ? 'Dừng nhạc' : 'Phát nhạc'

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      {visible && (
        <button
          className={`music-btn ${playing ? 'spin' : ''}`}
          onClick={toggle}
          aria-label={label}
          aria-pressed={playing}
          title={label}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            {playing ? (
              <>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </>
            ) : (
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            )}
          </svg>
        </button>
      )}

      <style>{`
        .music-btn {
          position: fixed;
          top: 16px;
          right: max(16px, calc(50% - var(--card-max) / 2 + 16px));
          z-index: 20;
          width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--c-accent);
          background: var(--c-primary);
          color: var(--c-cream);
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        }
        .music-btn.spin { animation: drFloat 3s ease-in-out infinite; }
      `}</style>
    </>
  )
})

export default MusicToggle
