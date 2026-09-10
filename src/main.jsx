import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Marks that scripting is alive, which arms the scroll-reveal start state in
// CSS. Set before first paint so there is no flash, and never set if the
// bundle fails to execute — in that case every section just renders visible.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)