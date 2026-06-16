import { useEffect, useRef, useState } from 'react'
import { IdCardIcon } from '../components/icons.jsx'
import { loadCarteirinhaData } from '../lib/carteirinhaStorage.js'
import { generateCarteirinha } from '../lib/carteirinhaGenerator.js'
import './Carteirinha.css'

export default function Carteirinha({ onManage }) {
  const [card, setCard] = useState(null) // { front, back }
  const [slide, setSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const data = loadCarteirinhaData()
    if (data.photo) {
      generateCarteirinha({ photoDataUrl: data.photo, fields: data })
        .then(setCard)
        .catch(() => {})
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setSlide(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <section className="cardpage">
        <p className="cardpage-msg">Carregando…</p>
      </section>
    )
  }

  if (!card) {
    return (
      <section className="cardpage cardpage--empty">
        <IdCardIcon size={64} className="cardpage-empty-icon" />
        <p className="cardpage-empty-title">Você ainda não tem uma carteirinha</p>
        <p className="cardpage-empty-sub">
          Preencha seus dados e envie sua foto para gerar a carteirinha.
        </p>
        <button className="cardpage-btn cardpage-btn--solid" onClick={onManage}>
          Preencher meus dados
        </button>
      </section>
    )
  }

  const slides = [
    { src: card.front, alt: 'Frente' },
    { src: card.back, alt: 'Verso' },
  ]

  return (
    <section className="cardpage">
      <div className="carousel" ref={trackRef} onScroll={onScroll}>
        {slides.map((s, i) => (
          <div className="carousel-slide" key={i}>
            <div className="card-stage">
              <img className="card-rot" src={s.src} alt={`Carteirinha — ${s.alt}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((s, i) => (
          <button
            key={i}
            className={'dot' + (slide === i ? ' dot--active' : '')}
            aria-label={`Ver ${s.alt.toLowerCase()}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <button
        className="cardpage-btn cardpage-btn--solid"
        onClick={() => setNote('Solicitação de carteirinha física — em breve.')}
      >
        Solicitar Carteirinha Física
      </button>

      {note && <p className="cardpage-note">{note}</p>}
    </section>
  )
}
