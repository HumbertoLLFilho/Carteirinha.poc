import { useEffect, useRef, useState } from 'react'
import {
  loadCarteirinhaData,
  saveCarteirinhaData,
  clearCarteirinhaData,
  fileToResizedDataUrl,
} from '../lib/carteirinhaStorage.js'
import { generateCarteirinha } from '../lib/carteirinhaGenerator.js'
import './Carteirinha.css'

const FIELDS = [
  { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
  { key: 'documento', label: 'Documento', placeholder: 'CPF ou RG' },
  { key: 'ra', label: 'RA', placeholder: 'Registro acadêmico' },
  { key: 'curso', label: 'Curso', placeholder: 'Nome do curso' },
]

export default function Carteirinha() {
  const [form, setForm] = useState({ nome: '', documento: '', ra: '', curso: '' })
  const [photo, setPhoto] = useState(null)
  const [generated, setGenerated] = useState(null) // { front, back }
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  // Carrega dados salvos e regenera o preview ao montar.
  useEffect(() => {
    const data = loadCarteirinhaData()
    setForm({
      nome: data.nome,
      documento: data.documento,
      ra: data.ra,
      curso: data.curso,
    })
    setPhoto(data.photo)
    if (data.photo) {
      generateCarteirinha({ photoDataUrl: data.photo, fields: data })
        .then(setGenerated)
        .catch(() => {})
    }
  }, [])

  const updateField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const dataUrl = await fileToResizedDataUrl(file)
      setPhoto(dataUrl)
    } catch (err) {
      setError(err?.message || 'Falha ao processar a foto.')
    } finally {
      setBusy(false)
    }
  }

  const handleGenerate = async () => {
    if (!photo) {
      setError('Envie a foto da pessoa para gerar a carteirinha.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      const result = await generateCarteirinha({ photoDataUrl: photo, fields: form })
      setGenerated(result)
      saveCarteirinhaData({ photo, ...form })
    } catch (err) {
      if (err?.name === 'QuotaExceededError') {
        setError('A foto é muito grande para salvar no dispositivo. Tente uma menor.')
      } else {
        setError(err?.message || 'Falha ao gerar a carteirinha.')
      }
    } finally {
      setBusy(false)
    }
  }

  const handleClear = () => {
    clearCarteirinhaData()
    setForm({ nome: '', documento: '', ra: '', curso: '' })
    setPhoto(null)
    setGenerated(null)
    setError(null)
  }

  const download = (dataUrl, name) => {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = name
    a.click()
  }

  return (
    <section className="cart">
      <h1 className="cart-title">Gerar Carteirinha</h1>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="cart-file"
        onChange={handlePhoto}
      />

      {/* Foto da pessoa */}
      <div className="cart-photo-row">
        <div className="cart-photo-frame">
          {photo ? (
            <img className="cart-photo" src={photo} alt="Foto da pessoa" />
          ) : (
            <span className="cart-photo-empty">Sem foto</span>
          )}
        </div>
        <button
          className="cart-btn cart-btn--primary cart-photo-btn"
          onClick={() => {
            setError(null)
            inputRef.current?.click()
          }}
          disabled={busy}
        >
          {photo ? 'Trocar foto' : 'Enviar foto'}
        </button>
      </div>

      {/* Dados */}
      <div className="cart-form">
        {FIELDS.map((f) => (
          <label key={f.key} className="cart-field">
            <span className="cart-field-label">{f.label}</span>
            <input
              className="cart-input"
              type="text"
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={updateField(f.key)}
            />
          </label>
        ))}
      </div>

      <button
        className="cart-btn cart-btn--primary cart-generate"
        onClick={handleGenerate}
        disabled={busy}
      >
        {busy ? 'Gerando…' : 'Gerar carteirinha'}
      </button>

      {error && <p className="cart-error">{error}</p>}

      {/* Resultado */}
      {generated && (
        <div className="cart-result">
          <div className="cart-side">
            <span className="cart-side-label">Frente</span>
            <img className="cart-generated" src={generated.front} alt="Carteirinha (frente)" />
            <button
              className="cart-btn cart-btn--ghost"
              onClick={() => download(generated.front, 'carteirinha-frente.jpg')}
            >
              Baixar frente
            </button>
          </div>

          <div className="cart-side">
            <span className="cart-side-label">Verso</span>
            <img className="cart-generated" src={generated.back} alt="Carteirinha (verso)" />
            <button
              className="cart-btn cart-btn--ghost"
              onClick={() => download(generated.back, 'carteirinha-verso.jpg')}
            >
              Baixar verso
            </button>
          </div>

          <button className="cart-btn cart-btn--danger" onClick={handleClear}>
            Limpar dados
          </button>
        </div>
      )}
    </section>
  )
}
