import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll bằng IntersectionObserver (không cần thư viện ngoài).
 * Trả về [ref, visible]. Gắn ref vào phần tử, thêm class khi visible = true.
 *
 *   const [ref, shown] = useReveal()
 *   <div ref={ref} className={'reveal ' + (shown ? 'is-visible' : '')} />
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Nếu người dùng tắt hiệu ứng chuyển động → hiện luôn.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}
