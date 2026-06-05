import {
  SmartphoneIcon,
  QrCodeIcon,
  IdCardIcon,
  GiftIcon,
  UserIcon,
  CameraIcon,
  BellIcon,
} from './icons.jsx'
import './HomeGrid.css'

const TILES = [
  { id: 'carteirinha-digital', label: 'Carteirinha Digital', color: 'var(--c-red)', Icon: SmartphoneIcon },
  { id: 'qrcode', label: 'QRCode [Acesso]', color: 'var(--c-blue)', Icon: QrCodeIcon },
  { id: 'carteirinha-fisica', label: 'Carteirinha Física', color: 'var(--c-yellow)', Icon: IdCardIcon },
  { id: 'ofertas', label: 'Ofertas', color: 'var(--c-teal)', Icon: GiftIcon },
  { id: 'cadastro', label: 'Cadastro', color: 'var(--c-purple)', Icon: UserIcon },
  { id: 'minha-foto', label: 'Minha Foto', color: 'var(--c-orange)', Icon: CameraIcon },
  { id: 'notificacoes', label: 'Notificações', color: 'var(--c-green)', Icon: BellIcon },
]

export default function HomeGrid({ onSelect }) {
  return (
    <div className="home-grid">
      {TILES.map(({ id, label, color, Icon }) => (
        <button
          key={id}
          className="tile"
          style={{ background: color }}
          onClick={() => onSelect?.(id)}
        >
          <Icon className="tile-icon" />
          <span className="tile-label">{label}</span>
        </button>
      ))}
    </div>
  )
}
