import { useState } from 'react'
import Header from '../components/Header.jsx'
import HomeGrid from '../components/HomeGrid.jsx'
import TabBar from '../components/TabBar.jsx'
import './Home.css'

export default function Home() {
  const [tab, setTab] = useState('inicio')

  // Placeholders: as telas internas serão implementadas nas próximas etapas.
  const handleSelect = (id) => {
    console.log('Abrir:', id)
  }

  return (
    <div className="home">
      <Header onMenu={() => console.log('menu')} />

      <main className="home-content">
        <HomeGrid onSelect={handleSelect} />
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
