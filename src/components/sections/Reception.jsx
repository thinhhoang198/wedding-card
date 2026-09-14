import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'
import { buildGoogleCalendarUrl } from '../../utils/helpers'

/** Lịch tháng tô đậm ngày cưới. */
function MiniCalendar({ year, month, day }) {
  const m = Number(month) - 1
  const first = new Date(year, m, 1)
  const startWeekday = (first.getDay() + 6) % 7 // T2 = 0
  const daysInMonth = new Date(year, m + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const head = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <div className="cal">
      <p className="cal-title">Tháng {month} / {year}</p>
      <div className="cal-grid">
        {head.map((h) => <span key={h} className="cal-h">{h}</span>)}
        {cells.map((d, i) => (
          <span key={i} className={'cal-d ' + (d === Number(day) ? 'is-day' : '')}>
            {d || ''}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Thông tin tiệc cưới: địa điểm, giờ, lịch tháng, thêm vào lịch. */
export default function Reception({ data, event }) {
  const r = event

  // Mỗi địa điểm (r) có giờ/địa chỉ riêng nên link tạo ra cũng khác nhau tương ứng.
  const calendarUrl = buildGoogleCalendarUrl({
    title: `Đám cưới ${data.groom.shortName} & ${data.bride.shortName}`,
    startISO: r.iso,
    durationHours: 2,
    location: `${r.venue}, ${r.address}`,
    description: `Tiệc cưới của ${data.groom.shortName} & ${data.bride.shortName} tại ${r.venue}, ${r.address}`,
  })

  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.reception} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="panel rec" variant="left">
        <p className="rec-venue">{r.venue}</p>
        <p className="rec-lead">Tiệc cưới sẽ diễn ra vào lúc</p>
        <div className="when-date">
          <div className="wd-col"><span className="wd-top">{r.weekday}</span><strong>{r.startTime}</strong></div>
          <div className="wd-sep" />
          <div className="wd-col"><span className="wd-top">Ngày</span><strong>{r.day}</strong></div>
          <div className="wd-sep" />
          <div className="wd-col"><span className="wd-top">Tháng {r.month}</span><strong>{r.year}</strong></div>
        </div>
        <p className="lunar">({r.lunar})</p>

        <div className="rec-times">
          <span>Đón khách <b>{r.welcomeTime}</b></span>
          <span>Khai tiệc <b>{r.startTime}</b></span>
        </div>

        {/* Hoa văn góc — nhành hồng góc trên trái, lá vàng góc dưới phải */}
        <img className="deco deco-rec-tl" src="/decor/decor-clean.png" alt="" aria-hidden="true" />
        <img className="deco deco-rec-br deco-mirror" src="/decor/decor5-clean.png" alt="" aria-hidden="true" />
      </Reveal>

      <Reveal className="panel cal-panel" variant="right">
        <MiniCalendar year={r.year} month={r.month} day={r.day} />
        <a className="btn btn-outline cal-btn" href={calendarUrl} target="_blank" rel="noopener noreferrer">
          ＋ Thêm vào lịch
        </a>

        {/* Hoa văn góc — nhành lá xanh nhỏ, đổi màu cho đỡ lặp với card phía trên */}
        <img className="deco deco-cal" src="/decor/decor4-clean.png" alt="" aria-hidden="true" />
      </Reveal>

      <style>{`
        .rec { text-align: center; }
        .deco-rec-tl {
          width: clamp(56px, 12vw, 98px);
          top: clamp(-20px, -4vw, -8px); left: clamp(-16px, -3.5vw, -6px);
        }
        .deco-rec-br {
          width: clamp(64px, 14vw, 116px);
          bottom: clamp(-20px, -4vw, -8px); right: clamp(-18px, -4vw, -6px);
        }
        .rec-venue { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.3rem; margin: 0 0 12px; }
        .rec-lead { color: var(--c-ink-soft); margin: 0 0 14px; }
        .rec-times { display: flex; justify-content: center; gap: 28px; margin-top: 16px; font-family: var(--f-serif); color: var(--c-ink); }
        .rec-times b { color: var(--c-primary); }

        .cal-panel {
          margin: 30px auto 0;
          max-width: 360px;
          text-align: center;
          box-shadow: 0 12px 30px rgba(74, 58, 40, 0.1);
        }
        .deco-cal {
          width: clamp(50px, 11vw, 84px);
          top: clamp(-18px, -4vw, -8px); right: clamp(-16px, -3.5vw, -6px);
        }
        .cal { max-width: 100%; margin: 0; }
        .cal-btn { display: inline-block; margin-top: 22px; }
        .cal-title {
          text-align: center; font-family: var(--f-serif); color: var(--c-primary);
          font-size: 1.15rem; margin: 0 0 14px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(201, 161, 90, 0.3);
        }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .cal-h { text-align: center; font-size: 0.72rem; color: var(--c-accent); padding: 4px 0; font-weight: 600; }
        .cal-d { text-align: center; padding: 7px 0; font-size: 0.9rem; color: var(--c-ink); border-radius: 50%; }
        /* Ngày cưới: hình trái tim thay vì khoanh tròn, số nằm trên nền tim */
        .cal-d.is-day {
          background:
            url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2030'%3E%3Cpath%20d='M16%2028.8%20C7%2021.2%202%2015.6%202%209.9%20C2%205.5%205.4%202%209.4%202%20C12%202%2014.4%203.6%2016%205.9%20C17.6%203.6%2020%202%2022.6%202%20C26.6%202%2030%205.5%2030%209.9%20C30%2015.6%2025%2021.2%2016%2028.8%20Z'%20fill='%23a67c1f'/%3E%3C/svg%3E")
            no-repeat center 56% / 34px 32px;
          color: var(--c-cream);
          font-weight: 700;
          border-radius: 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.35);
        }
      `}</style>
    </section>
  )
}
