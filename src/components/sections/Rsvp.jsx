import { useState } from 'react'
import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'
import { openMap } from '../../utils/helpers'
import { postToSheet } from '../../utils/sheet'

/** Xác nhận tham dự: địa điểm + chỉ đường + form RSVP gửi Google Sheet. */
export default function Rsvp({ data, event }) {
  const r = event
  const [form, setForm] = useState({ name: '', side: 'Nhà trai', attend: 'Có', guests: '1' })
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [hp, setHp] = useState('') // honeypot chống spam

  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (hp) return // bot điền honeypot
    if (!form.name.trim()) return
    setStatus('sending')
    // gửi kèm địa điểm tiệc đang chọn để biết khách dự Hà Nội hay Nha Trang
    await postToSheet(data.sheetEndpoint, 'rsvp', { ...form, event: r.label })
    setStatus('done')
  }

  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.rsvp} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="panel venue" variant="left">
        <p className="venue-lead">Tiệc cưới được tổ chức tại</p>
        <h3>{r.venue}</h3>
        <p className="venue-addr">{r.address}</p>
        <button className="btn btn-outline" onClick={() => openMap(r.mapQuery)}>📍 Chỉ đường</button>
      </Reveal>

      <Reveal className="panel rsvp-form" variant="right">
        {status === 'done' ? (
          <p className="thanks">Cảm ơn bạn đã xác nhận! 💌</p>
        ) : (
          <form onSubmit={submit}>
            <label>Họ và tên
              <input value={form.name} onChange={change('name')} placeholder="Nguyễn Văn A" required />
            </label>
            <label>Bạn là khách của
              <select value={form.side} onChange={change('side')}>
                <option>Nhà trai</option>
                <option>Nhà gái</option>
              </select>
            </label>
            <div className="row">
              <label>Tham dự
                <select value={form.attend} onChange={change('attend')}>
                  <option>Có</option>
                  <option>Không</option>
                </select>
              </label>
              <label>Số người
                <input type="number" min="0" max="20" value={form.guests} onChange={change('guests')} />
              </label>
            </div>
            {/* honeypot ẩn */}
            <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
            <button className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Đang gửi…' : 'Xác nhận tham dự'}
            </button>
          </form>
        )}
      </Reveal>

      <style>{`
        .venue { text-align: center; margin-bottom: 18px; }
        .venue-lead { color: var(--c-ink-soft); margin: 0 0 8px; font-size: 0.95rem; }
        .venue h3 { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.35rem; margin: 0 0 8px; }
        .venue-addr { color: var(--c-ink-soft); font-size: 0.92rem; margin: 0 0 16px; }

        .rsvp-form form { display: flex; flex-direction: column; gap: 14px; }
        .rsvp-form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--c-ink-soft); }
        .rsvp-form input, .rsvp-form select {
          font-family: var(--f-body); font-size: 1rem; padding: 11px 13px;
          border: 1px solid rgba(201,161,90,0.5); border-radius: 10px;
          background: var(--c-cream); color: var(--c-ink);
        }
        .rsvp-form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rsvp-form .btn { margin-top: 6px; }
        .rsvp-form .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .thanks { text-align: center; font-family: var(--f-serif); font-size: 1.3rem; color: var(--c-primary); margin: 10px 0; }
      `}</style>
    </section>
  )
}
