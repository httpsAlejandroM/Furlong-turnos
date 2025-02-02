import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext.tsx'
import { TabsProvider } from './contexts/tabsContext.tsx'
import { FuelProvider } from './contexts/FuelContext.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <FuelProvider>
    <TabsProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>,
    </BrowserRouter>
    </TabsProvider>
    </FuelProvider>
  </AuthProvider>

)
