import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'
import { downloadICS } from '../../utils/helpers'

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

  const addToCalendar = () =>
    downloadICS({
      title: `Tiệc cưới ${data.groom.shortName} & ${data.bride.shortName} (${r.label})`,
      startISO: r.iso,
      durationHours: 3,
      location: `${r.venue}, ${r.address}`,
      description: 'Trân trọng kính mời!',
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
      </Reveal>

      <Reveal variant="right">
        <MiniCalendar year={r.year} month={r.month} day={r.day} />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn btn-outline" onClick={addToCalendar}>＋ Thêm vào lịch</button>
        </div>
      </Reveal>

      <style>{`
        .rec { text-align: center; }
        .rec-venue { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.3rem; margin: 0 0 12px; }
        .rec-lead { color: var(--c-ink-soft); margin: 0 0 14px; }
        .rec-times { display: flex; justify-content: center; gap: 28px; margin-top: 16px; font-family: var(--f-serif); color: var(--c-ink); }
        .rec-times b { color: var(--c-primary); }

        .cal { max-width: 320px; margin: 30px auto 0; }
        .cal-title { text-align: center; font-family: var(--f-serif); color: var(--c-primary); font-size: 1.15rem; margin: 0 0 10px; }
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
