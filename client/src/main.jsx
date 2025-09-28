
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { UserContextProvider } from './Context/context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </BrowserRouter>
)
