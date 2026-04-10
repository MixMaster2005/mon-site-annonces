import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import AnnonceDetailsPage from './pages/AnnonceDetailsPage.jsx'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<SearchResultsPage />} />
        <Route path="/annonser/:id" element={<AnnonceDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
