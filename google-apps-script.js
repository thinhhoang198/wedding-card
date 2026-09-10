/**
 * GOOGLE APPS SCRIPT — Backend miễn phí cho thiệp cưới (RSVP + Lời chúc).
 *
 * CÁCH DÙNG:
 * 1. Tạo 1 Google Sheet mới. Tạo 2 tab (sheet) tên chính xác: "RSVP" và "LoiChuc".
 *    - Tab RSVP hàng 1:    Thời gian | Tên | Bên | Tham dự | Số người
 *    - Tab LoiChuc hàng 1: Thời gian | Tên | Lời chúc
 * 2. Trong Google Sheet: Extensions (Tiện ích mở rộng) → Apps Script.
 * 3. Xoá code mẫu, dán TOÀN BỘ file này vào, Save.
 * 4. Deploy → New deployment → chọn type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Deploy → copy "Web app URL".
 * 5. Dán URL đó vào biến môi trường VITE_SHEET_ENDPOINT trên Vercel
 *    (hoặc gán trực tiếp sheetEndpoint trong src/data/invitation.js).
 */

function doPost(e) {
  try {
    var p = e.parameter
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var now = new Date()

    if (p.type === 'rsvp') {
      ss.getSheetByName('RSVP').appendRow([
        now, p.name || '', p.side || '', p.attend || '', p.guests || '',
      ])
    } else if (p.type === 'wish') {
      ss.getSheetByName('LoiChuc').appendRow([now, p.name || '', p.message || ''])
    }
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  // Trả JSON danh sách lời chúc (mới nhất trước) cho Sổ lưu bút.
  var out = []
  if (e.parameter.type === 'wishes') {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LoiChuc')
    var rows = sh.getDataRange().getValues()
    for (var i = rows.length - 1; i >= 1; i--) {
      if (!rows[i][1]) continue
      out.push({
        time: formatDate_(rows[i][0]),
        name: rows[i][1],
        message: rows[i][2],
      })
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function formatDate_(d) {
  if (!(d instanceof Date)) return ''
  return Utilities.formatDate(d, 'GMT+7', 'dd/MM/yyyy HH:mm')
}
