import Reception from './sections/Reception'
import Rsvp from './sections/Rsvp'
import { useParallax } from '../hooks/useParallax'

/**
 * Khu vực Tiệc cưới + Xác nhận tham dự, hiển thị theo địa điểm khách đã chọn
 * ở cover (Hà Nội / Nha Trang). Nền ảnh mờ dùng chung, trôi parallax nhẹ.
 */
export default function PartySection({ data, event }) {
  const bgRef = useParallax({ speed: 0.18, scale: 1.22 })
  return (
    <div className="party-bg">
      <div
        ref={bgRef}
        className="party-bg-img"
        style={{ backgroundImage: `url(${data.photos.partyBg})` }}
        aria-hidden
      />
      <Reception data={data} event={event} />
      <Rsvp data={data} event={event} />
    </div>
  )
}
