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

/** Ngày dạng dd/MM/yyyy HH:mm cho lời chúc. */
export function formatNow() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`
}
