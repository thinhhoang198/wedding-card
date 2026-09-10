// Giao tiếp với Google Apps Script Web App (đóng vai backend miễn phí).
// Xem HUONG-DAN.md để biết cách tạo endpoint và dán URL vào invitation.js
// (hoặc biến môi trường VITE_SHEET_ENDPOINT trên Vercel).

/** Lấy danh sách lời chúc đã lưu. Trả về mảng {name, message, time}. */
export async function fetchWishes(endpoint) {
  if (!endpoint) return []
  try {
    const res = await fetch(`${endpoint}?type=wishes`)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    return Array.isArray(data) ? data : data.wishes || []
  } catch (err) {
    console.warn('Không tải được lời chúc:', err)
    return []
  }
}

/**
 * Gửi 1 bản ghi (RSVP hoặc lời chúc) tới Google Sheet.
 * Dùng no-cors + form-urlencoded để tránh lỗi CORS của Apps Script.
 * @param {string} endpoint
 * @param {'rsvp'|'wish'} type
 * @param {object} payload
 */
export async function postToSheet(endpoint, type, payload) {
  if (!endpoint) {
    // Chưa cấu hình endpoint → coi như gửi thành công để UI vẫn chạy khi demo.
    console.warn('Chưa cấu hình sheetEndpoint — bỏ qua việc gửi.')
    return { ok: true, demo: true }
  }
  const body = new URLSearchParams({ type, ...payload })
  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  // no-cors không đọc được response → coi như thành công nếu không ném lỗi.
  return { ok: true }
}
