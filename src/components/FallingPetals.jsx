import { useMemo } from 'react'

/**
 * Lớp hạt (trái tim/cánh hoa) rơi nhẹ — thuần CSS.
 * Dùng được ở 2 ngữ cảnh:
 *  - Nền thiệp chính: position "fixed" (mặc định).
 *  - Bên trong màn cover: position "absolute" + zIndex tuỳ chỉnh.
 */
export default function FallingPetals({
  count = 14,
  symbol = '❤',
  position = 'fixed',
  zIndex = 2,
  maxWidth = 'var(--card-max)',
  color = 'var(--c-primary-soft)',
  minSize = 8,
  maxSize = 20,
}) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: 9 + Math.random() * 8,
        delay: -Math.random() * 12,
        opacity: 0.18 + Math.random() * 0.25,
      })),
    [count, minSize, maxSize]
  )

  return (
    <div
      className="petals"
      aria-hidden
      style={{ position, zIndex, maxWidth }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left + '%',
            fontSize: p.size + 'px',
            opacity: p.opacity,
            color,
            animationDuration: p.duration + 's',
            animationDelay: p.delay + 's',
          }}
        >
          {symbol}
        </span>
      ))}

      <style>{`
        .petals {
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          margin: 0 auto;
        }
        .petals span {
          position: absolute;
          top: -6vh;
          animation-name: ambient-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .petals { display: none; }
        }
      `}</style>
    </div>
  )
}
