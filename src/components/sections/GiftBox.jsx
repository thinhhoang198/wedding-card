import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Reveal, SectionTitle } from '../common';
import { labels } from '../../data/invitation';

/** Thẻ chỉ hiện khi đủ thông tin thật — tránh để khách chuyển tiền nhầm vào số giữ chỗ. */
const isGiftReady = (g) =>
  Boolean(g.holder && g.bank && g.account) &&
  !/\.\.\./.test(g.bank) &&
  !/^0+$/.test(String(g.account).replace(/\s/g, ''));

/** Sao chép văn bản; có phương án dự phòng cho trình duyệt trong app (Zalo...) không có Clipboard API. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function GiftCard({ gift }) {
  const [qrFailed, setQrFailed] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | done | fail
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(gift.account);
    setCopyState(ok ? 'done' : 'fail');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState('idle'), 2400);
  };

  return (
    <div className="gm-card">
      <p className="gc-side">{gift.side}</p>
      <div className="gc-qr">
        {qrFailed ? (
          <p className="gc-qr-miss">Chưa có mã QR. Quý khách vui lòng chuyển khoản theo số tài khoản bên dưới.</p>
        ) : (
          <img src={gift.qr} alt={`Mã QR chuyển khoản của ${gift.side}`} onError={() => setQrFailed(true)} />
        )}
      </div>
      <p className="gc-bank">{gift.bank}</p>
      <p className="gc-acc">{gift.account}</p>
      <p className="gc-holder">{gift.holder}</p>
      <div className="gc-btns">
        <button className="btn btn-outline sm" onClick={onCopy}>
          {copyState === 'done' ? 'Đã sao chép ✓' : 'Sao chép STK'}
        </button>
        {!qrFailed && (
          <a className="btn btn-primary sm" href={gift.qr} download={`qr-${gift.side}.png`}>
            Lưu QR
          </a>
        )}
      </div>
      <p className="gc-status" role="status" aria-live="polite">
        {copyState === 'done' && `Đã sao chép số tài khoản ${gift.account}`}
        {copyState === 'fail' && 'Chưa sao chép được — quý khách giữ vào số tài khoản để sao chép thủ công.'}
      </p>
    </div>
  );
}

/** Hộp quà mừng: bấm để mở popup hiện QR + tài khoản của cô dâu & chú rể. */
export default function GiftBox({ data }) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
  const closeRef = useRef(null);
  const gifts = (data.gifts || []).filter(isGiftReady);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      openerRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    if (open) closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };

  // Chưa có thẻ nào đủ thông tin → ẩn cả mục, không để khách mở ra popup trống/giả.
  if (gifts.length === 0) return null;

  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <Reveal>
        <SectionTitle label={labels.gift} bilingual={data.bilingual} />
      </Reveal>

      <Reveal variant="zoom">
        <button
          ref={openerRef}
          className="gift-box"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          <img src="/decor/box.png" alt="Hộp quà" className="gift-img float" />
          <span className="gift-hint">Nhấn để mở</span>
        </button>
      </Reveal>

      {open &&
        createPortal(
          <div className="gm" onClick={close}>
            <div
              className="gm-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gm-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button ref={closeRef} className="gm-close" onClick={close} aria-label="Đóng">
                ✕
              </button>
              <h3 className="gm-title" id="gm-title">Hộp Quà Mừng</h3>
              <p className="gm-sub">Cảm ơn tình cảm của quý khách</p>

              <div className={`gm-cards ${gifts.length === 1 ? 'one' : ''}`}>
                {gifts.map((g) => (
                  <GiftCard gift={g} key={g.side} />
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}

      <style>{`
        .gift-box {
          position: relative; z-index: 0;
          background: transparent; border: none;
          padding: 10px; cursor: pointer;
          display: inline-flex; flex-direction: column; align-items: center; gap: 10px;
          transition: transform 0.2s;
        }
        .gift-box:hover { transform: translateY(-3px); }
        .gift-img {
          width: clamp(120px, 22vw, 180px);
          height: auto;
          filter: drop-shadow(0 14px 18px rgba(28, 20, 12, 0.25));
        }
        .gift-hint { color: var(--c-ink-soft); letter-spacing: 0.1em; font-size: 0.9rem; }

        .gm {
          position: fixed; inset: 0; z-index: 1001;
          background: rgba(28, 20, 12, 0.7);
          display: flex; align-items: center; justify-content: center; padding: 18px;
          animation: coverIn 0.25s ease both;
        }
        .gm-panel {
          position: relative;
          width: 100%; max-width: 720px;
          max-height: 90vh; overflow-y: auto;
          background: var(--c-cream);
          border-radius: var(--radius);
          border: 1px solid rgba(201,161,90,0.5);
          padding: 30px 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          animation: mainFade 0.35s ease both;
        }
        .gm-panel:has(.gm-cards.one) { max-width: 380px; }
        .gm-close {
          position: absolute; top: 10px; right: 10px;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid var(--c-accent); background: transparent;
          color: var(--c-primary); font-size: 18px; cursor: pointer;
        }
        .gm-title { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.7rem; margin: 0 0 4px; }
        .gm-sub { color: var(--c-ink-soft); margin: 0 0 22px; font-size: 0.92rem; }

        .gm-cards { display: grid; gap: 18px; }
        @media (min-width: 620px) { .gm-cards:not(.one) { grid-template-columns: 1fr 1fr; } }
        .gm-card {
          text-align: center;
          background: var(--c-cream-2); border-radius: 14px; padding: 20px 16px;
          border: 1px solid rgba(201,161,90,0.35);
        }
        .gc-side { font-family: var(--f-body); letter-spacing: 0.15em; color: var(--c-ink-soft); font-size: 0.85rem; margin: 0 0 12px; }
        .gc-qr { width: 160px; height: 160px; margin: 0 auto 12px; background: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(201,161,90,0.4); }
        .gc-qr img { width: 100%; height: 100%; object-fit: contain; }
        .gc-qr-miss { margin: 0; padding: 12px; font-size: 0.8rem; line-height: 1.45; color: var(--c-ink-soft); }
        .gc-bank { font-family: var(--f-serif); color: var(--c-primary); font-size: 1.15rem; margin: 4px 0; overflow-wrap: anywhere; }
        .gc-acc { font-size: 1.15rem; letter-spacing: 0.05em; color: var(--c-ink); margin: 2px 0; overflow-wrap: anywhere; }
        .gc-holder { color: var(--c-ink-soft); font-size: 0.9rem; margin: 2px 0 14px; overflow-wrap: anywhere; }
        .gc-btns { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .btn.sm { padding: 8px 16px; min-height: 44px; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; }
        .gc-status { min-height: 1.2em; margin: 8px 0 0; font-size: 0.8rem; color: var(--c-ink-soft); }
      `}</style>
    </section>
  );
}
