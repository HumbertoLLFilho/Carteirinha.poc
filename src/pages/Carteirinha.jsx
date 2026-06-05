import { useEffect, useRef, useState } from 'react'
import { IdCardIcon } from '../components/icons.jsx'
import {
  loadCarteirinhaImage,
  saveCarteirinhaImage,
  clearCarteirinhaImage,
  fileToResizedDataUrl,
} from '../lib/carteirinhaStorage.js'
import './Carteirinha.css'

export default function Carteirinha() {
  const [image, setImage] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setImage(loadCarteirinhaImage())
  }, [])

  const pickImage = () => {
    setError(null)
    inputRef.current?.click()
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // permite reenviar o mesmo arquivo depois
    if (!file) return

    setBusy(true)
    setError(null)
    try {
      const dataUrl = await fileToResizedDataUrl(file)
      saveCarteirinhaImage(dataUrl)
      setImage(dataUrl)
    } catch (err) {
      if (err?.name === 'QuotaExceededError') {
        setError('A imagem é muito grande para salvar no dispositivo. Tente uma imagem menor.')
      } else {
        setError(err?.message || 'Falha ao salvar a imagem.')
      }
    } finally {
      setBusy(false)
    }
  }

  const removeImage = () => {
    clearCarteirinhaImage()
    setImage(null)
    setError(null)
  }

  return (
    <section className="cart">
      <h1 className="cart-title">Minha Carteirinha</h1>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="cart-file"
        onChange={handleFile}
      />

      {image ? (
        <>
          <div className="cart-card">
            <img className="cart-image" src={image} alt="Carteirinha do estudante" />
          </div>
          <div className="cart-actions">
            <button
              className="cart-btn cart-btn--primary"
              onClick={pickImage}
              disabled={busy}
            >
              {busy ? 'Processando…' : 'Trocar imagem'}
            </button>
            <button
              className="cart-btn cart-btn--ghost"
              onClick={removeImage}
              disabled={busy}
            >
              Remover
            </button>
          </div>
          <p className="cart-hint">Imagem salva neste dispositivo.</p>
        </>
      ) : (
        <button className="cart-empty" onClick={pickImage} disabled={busy}>
          <IdCardIcon size={56} className="cart-empty-icon" />
          <span className="cart-empty-title">
            {busy ? 'Processando…' : 'Enviar imagem da carteirinha'}
          </span>
          <span className="cart-empty-sub">Toque para escolher uma foto ou imagem</span>
        </button>
      )}

      {error && <p className="cart-error">{error}</p>}
    </section>
  )
}
