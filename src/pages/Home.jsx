import { useState } from 'react'
import Header from '../components/Header.jsx'
import HomeGrid from '../components/HomeGrid.jsx'
import TabBar from '../components/TabBar.jsx'
import Carteirinha from './Carteirinha.jsx'
import QrCode from './QrCode.jsx'
import './Home.css'

export default function Home() {
  const [tab, setTab] = useState('inicio')

  // Atalhos da grade que já têm tela: levam para a aba correspondente.
  // Os demais ganharão telas internas nas próximas etapas.
  const handleSelect = (id) => {
    if (id === 'carteirinha-digital' || id === 'carteirinha-fisica') setTab('carteirinha')
    else if (id === 'qrcode') setTab('qrcode')
  }

  return (
    <div className="home">
      <Header onMenu={() => {}} />

      <main className="home-content">
        {tab === 'inicio' && (
          <div className="home-inicio">
            <HomeGrid onSelect={handleSelect} />
          </div>
        )}
        {tab === 'carteirinha' && <Carteirinha />}
        {tab === 'qrcode' && <QrCode />}
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
