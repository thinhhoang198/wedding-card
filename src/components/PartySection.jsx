import Reception from './sections/Reception'
import Rsvp from './sections/Rsvp'

/**
 * Khu vực Tiệc cưới + Xác nhận tham dự, hiển thị theo địa điểm khách đã chọn
 * ở cover (Hà Nội / Nha Trang). Nền ảnh mờ dùng chung.
 */
export default function PartySection({ data, event }) {
  return (
    <div className="party-bg">
      <div
        className="party-bg-img"
        style={{ backgroundImage: `url(${data.photos.partyBg})` }}
        aria-hidden
      />
      <Reception data={data} event={event} />
      <Rsvp data={data} event={event} />
    </div>
  )
}
