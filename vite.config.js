import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Thẻ xem trước link (og:image, og:url) bắt buộc phải là URL tuyệt đối thì Zalo/Facebook mới nhận.
// Ưu tiên VITE_SITE_URL (đặt trong Vercel nếu dùng tên miền riêng); không có thì dùng tên miền
// production Vercel cấp tự động; chạy local thì để trống (đường dẫn tương đối, không ảnh hưởng).
const siteUrl = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

const injectSiteUrl = () => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectSiteUrl()],
})
