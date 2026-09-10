# Thiệp Cưới Online — Hướng dẫn

Landing page thiệp cưới viết bằng **React (Vite)**, animation CSS thuần, deploy **Vercel**.
Bố cục & trải nghiệm tham khảo các mẫu trên chungdoi.com: cover "Mở thiệp" → cuộn dọc qua
đủ 12 mục, hạt rơi nền, reveal khi cuộn, song ngữ Việt–Hoa.

## 1. Chạy tại máy

```bash
npm install
npm run dev
```

Mở link Vite in ra (mặc định http://localhost:5173). Nên xem ở chế độ điện thoại
(DevTools → Toggle device toolbar) vì thiệp thiết kế mobile-first.

## 2. Sửa nội dung

Toàn bộ nội dung nằm ở **`src/data/invitation.js`** — sửa tên, ngày, gia đình, địa điểm,
timeline, số tài khoản… mà không cần đụng giao diện.

Đổi **tông màu** cả thiệp: sửa các biến trong khối `:root` ở đầu `src/styles/theme.css`
(`--c-primary`, `--c-accent`, `--c-cream`, `--c-bg`…).

## 3. Ảnh, nhạc, QR

Đặt file vào thư mục `public/` rồi tham chiếu bằng đường dẫn tuyệt đối:

| Loại        | Thư mục            | Khai báo trong `invitation.js` |
| ----------- | ------------------ | ------------------------------ |
| Album ảnh   | `public/album/`    | mảng `gallery`                 |
| Nhạc nền    | `public/music/`    | `musicSrc`                     |
| QR ngân hàng| `public/qr/`       | `gifts[].qr`                   |

(Chỗ nào chưa có ảnh sẽ tự hiện nền màu thay thế, không vỡ layout.)

## 4. RSVP + Lời chúc (Google Sheet, miễn phí)

Làm theo hướng dẫn trong **`google-apps-script.js`** để tạo endpoint, rồi:

- Khi deploy Vercel: thêm biến môi trường `VITE_SHEET_ENDPOINT` = URL Web App.
- Hoặc chạy local: tạo file `.env` với dòng `VITE_SHEET_ENDPOINT=https://script.google.com/...`

Nếu chưa cấu hình, thiệp vẫn chạy: RSVP báo "cảm ơn", Sổ lưu bút hiện lời chúc mẫu.

## 5. Deploy Vercel

1. Đẩy code lên GitHub.
2. Vercel → New Project → chọn repo. Framework tự nhận **Vite** (build `npm run build`,
   output `dist`).
3. Thêm Environment Variable `VITE_SHEET_ENDPOINT` (nếu dùng Google Sheet) → Deploy.

## Cấu trúc thư mục

```
src/
  data/invitation.js      # nội dung + nhãn song ngữ
  hooks/useReveal.js       # reveal-on-scroll (IntersectionObserver)
  utils/helpers.js         # mở Maps, tạo .ics, format ngày
  utils/sheet.js           # gọi Google Apps Script
  styles/theme.css         # biến màu + keyframes + class dùng chung
  components/
    Cover.jsx  FallingPetals.jsx  MusicToggle.jsx  common.jsx
    sections/  (11 mục: Hero → ThankYou)
  App.jsx  main.jsx
```
