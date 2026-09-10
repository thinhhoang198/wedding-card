import { useEffect, useState } from 'react'
import { Reveal, SectionTitle } from '../common'
import { labels } from '../../data/invitation'
import { fetchWishes, postToSheet } from '../../utils/sheet'
import { formatNow } from '../../utils/helpers'

/** Sổ lưu bút: danh sách lời chúc + form gửi lời chúc mới. */
export default function Guestbook({ data }) {
  const [wishes, setWishes] = useState(data.sampleWishes.map((w) => ({ ...w, time: '' })))
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    let alive = true
    fetchWishes(data.sheetEndpoint).then((list) => {
      if (alive && list.length) setWishes(list)
    })
    return () => { alive = false }
  }, [data.sheetEndpoint])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setStatus('sending')
    const entry = { ...form, time: formatNow() }
    await postToSheet(data.sheetEndpoint, 'wish', form)
    setWishes((w) => [entry, ...w]) // hiện ngay (optimistic)
    setForm({ name: '', message: '' })
    setStatus('idle')
  }

  return (
    <section className="section">
      <Reveal>
        <SectionTitle label={labels.guestbook} bilingual={data.bilingual} />
      </Reveal>

      <Reveal className="panel gb-form">
        <form onSubmit={submit}>
          <input
            placeholder="Tên của bạn"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            maxLength={40}
            required
          />
          <textarea
            placeholder="Gửi lời chúc tới cô dâu chú rể…"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            maxLength={300}
            rows={3}
            required
          />
          <button className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Đang gửi…' : '🪄 Gửi lời chúc'}
          </button>
        </form>
      </Reveal>

      <div className="gb-list">
        {wishes.map((w, i) => (
          <Reveal className="gb-item" key={i}>
            <div className="gb-head">
              <b>{w.name}</b>
              {w.time ? <span className="gb-time">{w.time}</span> : null}
            </div>
            <p>{w.message}</p>
          </Reveal>
        ))}
      </div>

      <style>{`
        .gb-form form { display: flex; flex-direction: column; gap: 12px; }
        .gb-form input, .gb-form textarea {
          font-family: var(--f-body); font-size: 1rem; padding: 11px 13px;
          border: 1px solid rgba(201,161,90,0.5); border-radius: 10px;
          background: var(--c-cream); color: var(--c-ink); resize: vertical;
        }
        .gb-list { display: flex; flex-direction: column; gap: 12px; margin: 20px auto 0; max-width: var(--content-max); }
        .gb-item {
          background: var(--c-cream-2); border-radius: 14px; padding: 14px 16px;
          border-left: 3px solid var(--c-accent);
        }
        .gb-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .gb-head b { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.05rem; }
        .gb-time { font-size: 0.72rem; color: var(--c-ink-soft); }
        .gb-item p { margin: 6px 0 0; color: var(--c-ink); font-size: 0.95rem; line-height: 1.5; }
      `}</style>
    </section>
  )
}
