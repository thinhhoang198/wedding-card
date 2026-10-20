import { useEffect, useRef } from 'react'

/**
 * Parallax gắn theo cuộn trang: phần tử dịch chuyển chậm/nhanh hơn nội dung
 * xung quanh để tạo chiều sâu. Không dùng thư viện ngoài — chỉ scroll listener
 * + requestAnimationFrame. `scale` nên >1 khi phần tử là ảnh lấp đầy khung có
 * overflow:hidden, để phần dịch chuyển không lộ mép ảnh.
 */
export function useParallax({ speed = 0.22, scale = 1, fromTop = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    el.style.willChange = 'transform'

    let raf = null
    const update = () => {
      raf = null
      // Đo khung cha (đứng yên) thay vì chính el đang bị transform → không tự phản hồi/trễ.
      const rect = (el.parentElement || el).getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const centerOffset = rect.top + rect.height / 2 - vh / 2
      // fromTop: ảnh đứng nguyên vị trí gốc khi chưa cuộn (thấy rõ mặt), cuộn mới trượt dần xuống.
      let y = fromTop ? window.scrollY * speed : centerOffset * -speed
      if (scale !== 1) {
        // translate nằm sau scale nên dịch thật = y*scale; chặn trong phần ảnh dư để không lộ mép.
        const maxY = ((scale - 1) * rect.height) / (2 * scale)
        y = Math.max(-maxY, Math.min(maxY, y))
      }
      y = Math.round(y)
      el.style.transform = scale !== 1 ? `scale(${scale}) translate3d(0, ${y}px, 0)` : `translate3d(0, ${y}px, 0)`
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed, scale, fromTop])

  return ref
}
