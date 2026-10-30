// ============================================================================
//  NỘI DUNG THIỆP CƯỚI  —  Chỉ cần sửa file này, không cần đụng tới giao diện.
//  Các trường có dạng { vi, zh } là song ngữ Việt – Hoa (zh có thể để "").
// ============================================================================

export const invitation = {
  // ---- Cấu hình chung ----------------------------------------------------
  bilingual: false, // true = hiện thêm dòng chữ Hoa ở tiêu đề các mục
  musicSrc: '/music/nhac-nen.mp3', // đặt file nhạc vào public/music/
  // Công tắc hiện/ẩn các mục chưa dùng tới. Đổi false -> true để mở lại (code giữ nguyên, không mất gì).
  features: {
    rsvp: false, // mục "Xác Nhận Tham Dự"
    guestbook: false, // mục "Sổ Lưu Bút"
  },
  // Endpoint Google Apps Script để lưu RSVP + lời chúc (xem HUONG-DAN.md).
  // Ưu tiên lấy từ biến môi trường VITE_SHEET_ENDPOINT khi deploy Vercel.
  sheetEndpoint: import.meta.env.VITE_SHEET_ENDPOINT || '',

  // ---- Cặp đôi -----------------------------------------------------------
  groom: {
    name: 'Hoàng Đức Thịnh',
    shortName: 'Đức Thịnh',
    role: 'Út Nam', // Trưởng nam / Thứ nam / Út nam... (sửa nếu khác)
    photo: '/couple/chu-re1.jpg', // ảnh chú rể (Nha Trang)
  },
  bride: {
    name: 'Nguyễn Cao Thùy Duyên',
    shortName: 'Thùy Duyên',
    role: 'Trưởng Nữ', // (sửa nếu khác)
    photo: '/couple/co-dau1.jpg', // ảnh cô dâu — đặt vào public/couple/
  },

  // ---- Ảnh cưới rải khắp thiệp (triển lãm ảnh) --------------------------
  // MỘT bộ ảnh chung cho cả 2 địa điểm (Hà Nội / Nha Trang dùng giống hệt nhau).
  photos: {
    hero: '/couple/hero-hanoi.jpg', // ảnh lớn khung vòm ở đầu thiệp (Hà Nội)
    // 2 dải ảnh full-width điện ảnh (kèm câu chú thích)
    band1: {
      src: '/couple/band-1.jpg', // Nha Trang
      caption: 'Chuyện của chúng mình bắt đầu…',
      captionPosition: 'top', // cặp đôi nằm thấp trong khung nên đặt chữ lên bầu trời
    },
    band2: { src: '/couple/band-hanoi-2.jpg', caption: 'Và mãi mãi về sau' }, // Hà Nội
    thankYou: '/couple/cam-on.jpg', // ảnh cuối, trước lời cảm ơn (Nha Trang)
    partyBg: '/couple/tiec-bg.jpg', // ảnh nền mờ sau mục Tiệc cưới + RSVP (ngang)
  },

  // ---- Ngày cưới ---------------------------------------------------------
  weddingDate: {
    iso: '2026-11-29T17:30:00+07:00', // dùng cho đếm ngược & file lịch (.ics)
    solar: '29 tháng 11, 2026',
    weekday: 'Chủ Nhật',
    day: '29',
    month: '11',
    year: '2026',
    lunar: 'Tức ngày 21 tháng 10 năm Bính Ngọ',
  },

  // ---- Thông tin hai bên gia đình ---------------------------------------
  families: {
    groom: {
      father: 'Ông: Hoàng Ngọc Hưng',
      mother: 'Bà: Nguyễn Thị Tuyết Nga',
      address: '', // (tuỳ chọn) địa chỉ nhà trai — điền nếu muốn hiển thị
    },
    bride: {
      father: 'Ông: Nguyễn Cao Nguyên',
      mother: 'Bà: Trần Thị Ngọc Tuyền',
      address: '', // (tuỳ chọn) địa chỉ nhà gái
    },
  },

  // ---- Tiệc cưới — 2 nơi (khách chọn Hà Nội / Nha Trang ở màn cover) ------
  // `ceremony` (Hôn lễ tại tân gia) chỉ có ở Nha Trang; Hà Nội không có → mục đó tự ẩn.
  events: [
    {
      id: 'nhatrang',
      label: 'Nha Trang',
      venue: 'Trung Tâm Hội Nghị Âu Lạc Thịnh',
      address: '99 Nguyễn Thị Minh Khai, Phường Nha Trang, Khánh Hòa',
      mapQuery:
        'Trung Tâm Hội Nghị Âu Lạc Thịnh, 99 Nguyễn Thị Minh Khai, Nha Trang',
      iso: '2026-11-22T17:30:00+07:00',
      welcomeTime: '17:30',
      startTime: '17:30',
      weekday: 'Chủ Nhật',
      day: '22',
      month: '11',
      year: '2026',
      lunar: 'Tức ngày 14 tháng 10 năm Bính Ngọ',
      ceremony: {
        place: 'Tân Gia Nhà Gái',
        timelineLabel: 'Hôn lễ tại tân gia', // tên mốc hiện trong Lịch Trình
        time: '15:00',
        weekday: 'Chủ Nhật',
        day: '22',
        month: '11',
        year: '2026',
        lunar: 'Tức ngày 14 tháng 10 năm Bính Ngọ',
      },
    },
    {
      id: 'hanoi',
      label: 'Hà Nội',
      venue: 'Cung Văn Hóa Hữu Nghị Việt - Xô',
      address: '91 Trần Hưng Đạo, Phường Cửa Nam, Thành phố Hà Nội',
      mapQuery:
        'Cung Văn hóa Lao động Hữu nghị Việt Xô, 91 Trần Hưng Đạo, Hà Nội',
      iso: '2026-11-29T17:30:00+07:00',
      welcomeTime: '17:30',
      startTime: '17:30',
      weekday: 'Chủ Nhật',
      day: '29',
      month: '11',
      year: '2026',
      lunar: 'Tức ngày 21 tháng 10 năm Bính Ngọ',
    },
  ],

  // ---- Lịch trình ngày cưới ---------------------------------------------
  timeline: [
    { time: '17:30', label: 'Đón khách' },
    { time: '18:00', label: 'Khai tiệc' },
    { time: '18:30', label: 'Nghi thức cưới' },
    { time: '19:00', label: 'Cắt bánh & nâng ly' },
    { time: '21:00', label: 'Kết thúc tiệc' },
  ],

  // ---- Dress code --------------------------------------------------------
  dressCode: {
    note: 'Rất mong quý khách chọn trang phục theo tông màu dưới đây để bữa tiệc thêm trọn vẹn.',
    colors: ['#a67c1f', '#c8a43c', '#8a6f46', '#faf5e9'],
  },

  // ---- Album ảnh ---------------------------------------------------------
  // Đặt ảnh vào public/album/ rồi liệt kê đường dẫn ở đây.
  // Album chung cho cả 2 địa điểm: public/album/1–10 = Nha Trang · 11–17 = Hà Nội (xen kẽ).
  gallery: [
    '/album/1.jpg',
    '/album/16.jpg',
    '/album/2.jpg',
    '/album/11.jpg',
    '/album/3.jpg',
    '/album/12.jpg',
    '/album/4.jpg',
    '/album/13.jpg',
    '/album/5.jpg',
    '/album/14.jpg',
    '/album/6.jpg',
    '/album/15.jpg',
    '/album/7.jpg',
    '/album/17.jpg',
    '/album/8.jpg',
    '/album/9.jpg',
    '/album/10.jpg',
  ],

  // ---- Hộp quà mừng (chuyển khoản) --------------------------------------
  // LƯU Ý: số tài khoản & ảnh QR bên dưới là placeholder — hãy thay bằng
  // thông tin thật của bạn (đặt ảnh QR vào public/qr/).
  gifts: [
    {
      side: 'Chú Rể',
      holder: 'HOANG DUC THINH',
      bank: 'Ngân hàng Quân Đội (MB)',
      account: '0705030017',
      qr: '/qr/qr-chure.png', // ảnh QR đặt trong public/qr/
    },
    {
      side: 'Cô Dâu',
      holder: 'NGUYEN CAO THUY DUYEN',
      bank: 'Ngân hàng ...',
      account: '0000000000',
      qr: '/qr/qr-codau.png',
    },
  ],

  // ---- Lời chúc mẫu (hiện khi Google Sheet chưa có dữ liệu) --------------
  sampleWishes: [
    {
      name: 'Duy Khang',
      message: 'Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!',
    },
    {
      name: 'Lan Chi',
      message: 'Đẹp đôi quá! Chúc hai bạn sống bên nhau đầu bạc răng long.',
    },
    {
      name: 'Tuấn Anh',
      message:
        'Mừng hạnh phúc hai bạn! Chúc gia đình nhỏ luôn đầy ắp tiếng cười.',
    },
  ],

  // ---- Lời cảm ơn cuối thiệp --------------------------------------------
  thankYou:
    'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
};

// Nhãn tiêu đề các mục (dùng chung toàn thiệp)
export const labels = {
  saveTheDate: { vi: 'Save The Date' },
  theWeddingOf: { vi: 'The Wedding of' },
  weddingInfo: { vi: 'Hai Bên Gia Đình' },
  announce: { vi: 'Trân Trọng Báo Tin' },
  ceremony: { vi: 'Lễ Thành Hôn' },
  couple: { vi: 'Đôi Uyên Ương' }, // tiêu đề thay thế khi địa điểm không có Hôn lễ (Hà Nội)
  album: { vi: 'Album Ảnh' },
  reception: { vi: 'Thông Tin Tiệc Cưới' },
  rsvp: { vi: 'Xác Nhận Tham Dự' },
  dressCode: { vi: 'Dress Code' },
  timeline: { vi: 'Lịch Trình Ngày Cưới' },
  guestbook: { vi: 'Sổ Lưu Bút' },
  gift: { vi: 'Hộp Quà Mừng' },
};
