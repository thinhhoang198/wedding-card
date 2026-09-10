import { useEffect, useRef, useState } from 'react'
import { invitation } from './data/invitation'

import Cover from './components/Cover'
import MusicToggle from './components/MusicToggle'

import Hero from './components/sections/Hero'
import CoupleInfo from './components/sections/CoupleInfo'
import Ceremony from './components/sections/Ceremony'
import Gallery from './components/sections/Gallery'
import Reception from './components/sections/Reception'
import Rsvp from './components/sections/Rsvp'
import DressCode from './components/sections/DressCode'
import Timeline from './components/sections/Timeline'
import Guestbook from './components/sections/Guestbook'
import GiftBox from './components/sections/GiftBox'
import ThankYou from './components/sections/ThankYou'

const OPEN_ANIM_MS = 1900 // thời lượng animation mở thiệp (lóe sáng → bay lên → hiện section)

export default function App() {
  // 'cover'  = màn mở thiệp, không cuộn
  // 'opening'= card đang bay lên & mờ dần
  // 'open'   = đã vào thiệp chính, cuộn được
  const [phase, setPhase] = useState('cover')
  const audioRef = useRef(null)

  // Khoá cuộn cho tới khi vào thiệp chính.
  useEffect(() => {
    document.body.style.overflow = phase === 'open' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  const handleOpen = () => {
    if (phase !== 'cover') return
    setPhase('opening')
    audioRef.current?.play?.().catch(() => {})
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      setPhase('open')
    }, OPEN_ANIM_MS)
  }

  const isOpen = phase === 'open'

  return (
    <div className="card-shell">
      {/* Nhạc nền luôn được mount để phát ngay khi bấm mở thiệp */}
      <MusicToggle ref={audioRef} src={invitation.musicSrc} visible={isOpen} />

      {/* Màn cover (kèm hiệu ứng đóng khi phase = opening) */}
      {phase !== 'open' && (
        <Cover data={invitation} onOpen={handleOpen} closing={phase === 'opening'} />
      )}

      {/* Thiệp chính — chưa render khi ở cover; mount ngay khi bắt đầu mở
          (phase 'opening') để cover bay lên là lộ thẳng ra thiệp, không hở nền tối */}
      {phase !== 'cover' && (
          <main id="content" className="main-fade">
            <Hero data={invitation} />
            <CoupleInfo data={invitation} />
            <Ceremony data={invitation} />
            <Gallery data={invitation} />
            <Reception data={invitation} />
            <Rsvp data={invitation} />
            <DressCode data={invitation} />
            <Timeline data={invitation} />
            <Guestbook data={invitation} />
            <GiftBox data={invitation} />
            <ThankYou data={invitation} />
          </main>
      )}
    </div>
  )
}
