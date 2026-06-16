import { MenuIcon, ArrowLeftIcon, LogoMark } from './icons.jsx'
import './Header.css'

export default function Header({ onMenu, onBack }) {
  return (
    <header className="app-header">
      {onBack ? (
        <button className="header-btn" aria-label="Voltar" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
      ) : (
        <button className="header-btn" aria-label="Abrir menu" onClick={onMenu}>
          <MenuIcon />
        </button>
      )}

      <div className="header-logo">
        <LogoMark className="header-logo-mark" />
        <span className="header-logo-text">carteirinha</span>
      </div>

      <button className="header-avatar" aria-label="Perfil" />
    </header>
  )
}
