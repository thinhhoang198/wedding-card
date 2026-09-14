// Các hàm tiện ích nhỏ, không phụ thuộc thư viện ngoài.

/** Mở Google Maps tới địa điểm tiệc cưới. */
export function openMap(query) {
  const url =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(query)
  window.open(url, '_blank', 'noopener')
}

/** Định dạng thời gian theo chuẩn iCalendar: 20260103T180000. */
function toICSDate(date) {
  const p = (n) => String(n).padStart(2, '0')
  return (
    date.getFullYear() +
    p(date.getMonth() + 1) +
    p(date.getDate()) +
    'T' +
    p(date.getHours()) +
    p(date.getMinutes()) +
    '00'
  )
}

/**
 * Tạo & tải file .ics để khách thêm ngày cưới vào lịch điện thoại.
 * @param {{title:string, startISO:string, durationHours?:number, location?:string, description?:string}} opts
 */
export function downloadICS({
  title,
  startISO,
  durationHours = 3,
  location = '',
  description = '',
}) {
  const start = new Date(startISO)
  const end = new Date(start.getTime() + durationHours * 3600 * 1000)

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//thiep-cuoi//VI',
    'BEGIN:VEVENT',
    'UID:' + start.getTime() + '@thiep-cuoi',
    'DTSTAMP:' + toICSDate(new Date()),
    'DTSTART:' + toICSDate(start),
    'DTEND:' + toICSDate(end),
    'SUMMARY:' + title,
    'LOCATION:' + location.replace(/,/g, '\\,'),
    'DESCRIPTION:' + description.replace(/,/g, '\\,'),
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'thiep-cuoi.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Xây URL "Thêm vào lịch" của Google Calendar — mở thẳng màn hình lưu sự kiện
 * (web hoặc app Google Calendar) đã điền sẵn tên/giờ/địa điểm, không cần tải
 * file hay backend. Theo đúng format Google dùng:
 *   calendar.google.com/calendar/u/0/r/eventedit?text=..&dates=START/END(UTC)&ctz=..&details=..&location=..
 * `startISO` nên có sẵn offset múi giờ (vd '2026-11-22T18:00:00+07:00') để
 * quy đổi UTC luôn đúng bất kể khách xem thiệp ở múi giờ nào.
 * @param {{title:string, startISO:string, durationHours?:number, location?:string, description?:string, timezone?:string}} opts
 * @returns {string} URL, hoặc '#' nếu startISO không hợp lệ.
 */
export function buildGoogleCalendarUrl({
  title,
  startISO,
  durationHours = 2,
  location = '',
  description = '',
  timezone = 'Asia/Ho_Chi_Minh',
}) {
  const start = new Date(startISO)
  if (Number.isNaN(start.getTime())) return '#'
  const end = new Date(start.getTime() + durationHours * 3600 * 1000)

  // Google Calendar cần UTC dạng "YYYYMMDDTHHMMSSZ" (bỏ dấu -, :, phần mili giây).
  const toGCalUTC = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  // Ghép tay (không dùng URLSearchParams) để giữ dấu "/" trong "dates" ở dạng
  // thô như Google phát hành, thay vì bị encode thành "%2F".
  return (
    'https://calendar.google.com/calendar/u/0/r/eventedit' +
    `?text=${encodeURIComponent(title)}` +
    `&dates=${toGCalUTC(start)}/${toGCalUTC(end)}` +
    `&ctz=${encodeURIComponent(timezone)}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`
  )
}

/** Ngày dạng dd/MM/yyyy HH:mm cho lời chúc. */
export function formatNow() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`
}
