import React from 'react'
import ReactDOM from 'react-dom/client'
import Page from './index'
import './index.css' // This is where you should paste your CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)