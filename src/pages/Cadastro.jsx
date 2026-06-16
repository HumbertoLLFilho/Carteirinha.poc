import { useEffect, useRef, useState } from 'react'
import {
  loadCarteirinhaData,
  saveCarteirinhaData,
  fileToResizedDataUrl,
} from '../lib/carteirinhaStorage.js'
import './Cadastro.css'

const FIELDS = [
  { key: 'nome', label: 'Nome', placeholder: 'Nome completo' },
  { key: 'curso', label: 'Curso', placeholder: 'Ex.: ADS 3A Noite' },
  { key: 'ra', label: 'RA', placeholder: 'Registro acadêmico' },
  { key: 'validade', label: 'Validade', placeholder: 'MM/AAAA' },
]

export default function Cadastro({ onSaved }) {
  const [form, setForm] = useState({ nome: '', curso: '', ra: '', validade: '' })
  const [photo, setPhoto] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const d = loadCarteirinhaData()
    setForm({ nome: d.nome, curso: d.curso, ra: d.ra, validade: d.validade })
    setPhoto(d.photo)
  }, [])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      setPhoto(await fileToResizedDataUrl(file))
    } catch (err) {
      setError(err?.message || 'Falha ao processar a foto.')
    } finally {
      setBusy(false)
    }
  }

  const handleSave = () => {
    if (!photo) {
      setError('Envie a foto da pessoa.')
      return
    }
    if (!form.nome.trim()) {
      setError('Informe o nome.')
      return
    }
    try {
      saveCarteirinhaData({ photo, ...form })
      onSaved?.()
    } catch (err) {
      setError(
        err?.name === 'QuotaExceededError'
          ? 'A foto é muito grande para salvar. Tente uma menor.'
          : err?.message || 'Falha ao salvar os dados.',
      )
    }
  }

  return (
    <section className="cad">
      <h1 className="cad-title">Meus dados</h1>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="cad-file"
        onChange={handlePhoto}
      />

      <div className="cad-photo-row">
        <div className="cad-photo-frame">
          {photo ? (
            <img className="cad-photo" src={photo} alt="Foto da pessoa" />
          ) : (
            <span className="cad-photo-empty">Sem foto</span>
          )}
        </div>
        <button
          className="cad-btn cad-btn--primary cad-photo-btn"
          onClick={() => {
            setError(null)
            inputRef.current?.click()
          }}
          disabled={busy}
        >
          {photo ? 'Trocar foto' : 'Enviar foto'}
        </button>
      </div>

      <div className="cad-form">
        {FIELDS.map((f) => (
          <label key={f.key} className="cad-field">
            <span className="cad-field-label">{f.label}</span>
            <input
              className="cad-input"
              type="text"
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={update(f.key)}
            />
          </label>
        ))}
      </div>

      {error && <p className="cad-error">{error}</p>}

      <button
        className="cad-btn cad-btn--primary cad-save"
        onClick={handleSave}
        disabled={busy}
      >
        Salvar e ver carteirinha
      </button>
    </section>
  )
}
