import { QrCodeIcon } from '../components/icons.jsx'
import './Placeholder.css'

export default function QrCode() {
  return (
    <section className="placeholder">
      <QrCodeIcon size={64} className="placeholder-icon" />
      <h1 className="placeholder-title">QR Code</h1>
      <p className="placeholder-sub">Em breve.</p>
    </section>
  )
}
