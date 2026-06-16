import { useState } from 'react'
import Header from '../components/Header.jsx'
import HomeGrid from '../components/HomeGrid.jsx'
import TabBar from '../components/TabBar.jsx'
import Carteirinha from './Carteirinha.jsx'
import Cadastro from './Cadastro.jsx'
import QrCode from './QrCode.jsx'
import './Home.css'

const FOOTER_TABS = ['inicio', 'carteirinha', 'qrcode']

export default function Home() {
  // view pode ser uma aba do footer ou 'cadastro' (tela fora do footer).
  const [view, setView] = useState('inicio')

  const handleSelect = (id) => {
    if (id === 'cadastro' || id === 'minha-foto') setView('cadastro')
    else if (id === 'carteirinha-digital' || id === 'carteirinha-fisica') setView('carteirinha')
    else if (id === 'qrcode') setView('qrcode')
  }

  const activeTab = FOOTER_TABS.includes(view) ? view : null

  return (
    <div className="home">
      <Header onBack={view === 'cadastro' ? () => setView('inicio') : undefined} />

      <main className="home-content">
        {view === 'inicio' && (
          <div className="home-inicio">
            <HomeGrid onSelect={handleSelect} />
          </div>
        )}
        {view === 'carteirinha' && <Carteirinha onManage={() => setView('cadastro')} />}
        {view === 'qrcode' && <QrCode />}
        {view === 'cadastro' && <Cadastro onSaved={() => setView('carteirinha')} />}
      </main>

      <TabBar active={activeTab} onChange={setView} />
    </div>
  )
}
