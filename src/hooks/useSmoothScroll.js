import { useEffect } from 'react'
import Lenis from 'lenis'

// Chỉ bật smooth-scroll (quán tính + easing khi lăn chuột) từ mốc này trở lên.
// Dưới mốc này (điện thoại/tablet) giữ nguyên cuộn chạm mặc định của trình
// duyệt — vốn đã mượt sẵn, còn "quán tính nhân tạo" trên cảm ứng thường phản
// tác dụng (trễ tay, xung đột với vuốt của carousel/lightbox).
const DESKTOP_QUERY = '(min-width: 1025px)'

let lenisInstance = null

/**
 * Cuộn về đầu trang, dùng API của Lenis khi nó đang chạy để không bị giằng co
 * với vòng lặp easing của nó (gọi window.scrollTo thẳng trong lúc Lenis đang
 * hoạt động dễ gây giật một nhịp). Dùng thay cho window.scrollTo(0, 0) thô.
 */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

/**
 * Bật hiệu ứng cuộn mượt (smooth scroll) kiểu quán tính cho toàn trang, dùng
 * thư viện Lenis — chỉ áp dụng ở màn hình desktop (xem DESKTOP_QUERY).
 * Lenis vẫn dùng cơ chế cuộn thật của trình duyệt (window.scrollTo mỗi khung
 * hình) chứ không transform cả trang, nên các hiệu ứng dựa theo cuộn có sẵn
 * (useParallax, IntersectionObserver trong useReveal) không cần sửa gì thêm.
 * Tôn trọng "prefers-reduced-motion" (Lenis tự xử lý qua respectReducedMotion).
 * Tự bật/tắt lại nếu người dùng resize cửa sổ qua lại ngưỡng desktop.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)

    const start = () => {
      if (lenisInstance) return
      lenisInstance = new Lenis({
        duration: 0.7, // rút ngắn từ 1.1s — phản hồi nhanh tay hơn, đỡ chóng mặt
        easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out quadratic — dứt khoát hơn cubic
        wheelMultiplier: 1,
        autoRaf: true, // Lenis tự chạy requestAnimationFrame, không cần tự quản lý
      })
    }
    const stop = () => {
      lenisInstance?.destroy()
      lenisInstance = null
    }

    const onChange = (e) => (e.matches ? start() : stop())
    if (mq.matches) start()
    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
      stop()
    }
  }, [])
}
