import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Fontes hospedadas junto com o site (sem requisição bloqueante ao Google Fonts)
import '@fontsource-variable/inter'
import '@fontsource-variable/fira-code'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build o HTML já vem pré-renderizado (scripts/prerender.mjs): hidrata.
// No `npm run dev` o #root está vazio: renderiza do zero.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
