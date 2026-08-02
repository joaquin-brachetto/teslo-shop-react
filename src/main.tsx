import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TesloShop } from './TesloShopApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloShop />
  </StrictMode>,
)
