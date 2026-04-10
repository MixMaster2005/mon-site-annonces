import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvide'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename="/mon-site-annonces">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
