import { useReveal } from '../hooks/useReveal'

/** Tiêu đề mục có dòng chữ Hoa (song ngữ) tuỳ chọn + dấu phân cách. */
export function SectionTitle({ label, bilingual }) {
  return (
    <>
      <h2 className="section-title">
        {label.vi}
        {bilingual && label.zh ? <span className="zh">{label.zh}</span> : null}
      </h2>
      <div className="divider" aria-hidden>
        ❦
      </div>
    </>
  )
}

/** Bọc nội dung để fade/slide-in khi cuộn tới. */
export function Reveal({ children, as: Tag = 'div', className = '', style }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
