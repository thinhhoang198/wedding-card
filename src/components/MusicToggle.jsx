import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

/**
 * Nhạc nền + nút bật/tắt cố định góc màn.
 * ref được App dùng để gọi .play() ngay khi bấm "Mở thiệp".
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

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      {visible && (
        <button
          className={`music-btn ${playing ? 'spin' : ''}`}
          onClick={toggle}
          aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
          title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
        >
          {playing ? '♫' : '♪'}
        </button>
      )}

      <style>{`
        .music-btn {
          position: fixed;
          top: 16px;
          right: max(16px, calc(50% - var(--card-max) / 2 + 16px));
          z-index: 20;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid var(--c-accent);
          background: var(--c-primary);
          color: var(--c-cream);
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        }
        .music-btn.spin { animation: drFloat 3s ease-in-out infinite; }
      `}</style>
    </>
  )
})

export default MusicToggle
