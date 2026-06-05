// Ícones SVG inline (sem dependência externa). Herdam a cor via currentColor.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function MenuIcon({ size = 26, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

// Ícone da logo "carteirinha": balão/etiqueta com gota
export function LogoMark({ size = 30, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        d="M12 2C6.9 2 2.7 5.4 2.7 9.6c0 2.5 1.5 4.7 3.8 6.1-.2 1.4-.9 2.8-2 3.9 1.9-.2 3.7-.9 5-2 .8.2 1.7.3 2.5.3 5.1 0 9.3-3.4 9.3-7.6S17.1 2 12 2z"
        fill="currentColor"
      />
      <circle cx="12" cy="9.6" r="2.2" fill="#fff" />
    </svg>
  )
}

export function SmartphoneIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <circle cx="12" cy="8" r="2" />
      <path d="M8.5 16.5c.7-1.6 2-2.5 3.5-2.5s2.8.9 3.5 2.5" />
    </svg>
  )
}

export function QrCodeIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <line x1="14" y1="14" x2="14" y2="17" />
      <line x1="14" y1="21" x2="17" y2="21" />
      <line x1="17" y1="14" x2="21" y2="14" />
      <line x1="21" y1="17" x2="21" y2="21" />
      <line x1="17" y1="17.5" x2="17.5" y2="17.5" />
    </svg>
  )
}

export function IdCardIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <path d="M4.5 16.5c.6-1.4 1.9-2.2 3.5-2.2s2.9.8 3.5 2.2" />
      <line x1="14" y1="10" x2="19" y2="10" />
      <line x1="14" y1="13" x2="19" y2="13" />
    </svg>
  )
}

export function GiftIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <line x1="3" y1="13" x2="21" y2="13" />
      <line x1="12" y1="9" x2="12" y2="21" />
      <path d="M12 9C12 6 10 4.5 8 5.5S7 9 9 9zM12 9c0-3 2-4.5 4-3.5S17 9 15 9z" />
    </svg>
  )
}

export function UserIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  )
}

export function CameraIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

export function BellIcon({ size = 40, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function HomeIcon({ size = 26, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <line x1="10" y1="20" x2="10" y2="15" />
      <line x1="14" y1="20" x2="14" y2="15" />
    </svg>
  )
}
