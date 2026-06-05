import { HomeIcon, SmartphoneIcon, QrCodeIcon } from './icons.jsx'
import './TabBar.css'

const TABS = [
  { id: 'inicio', label: 'Início', Icon: HomeIcon },
  { id: 'carteirinha', label: 'Carteirinha', Icon: SmartphoneIcon },
  { id: 'qrcode', label: 'QR Code', Icon: QrCodeIcon },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={'tab' + (active === id ? ' tab--active' : '')}
          aria-current={active === id ? 'page' : undefined}
          onClick={() => onChange?.(id)}
        >
          <Icon size={24} className="tab-icon" />
          <span className="tab-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
