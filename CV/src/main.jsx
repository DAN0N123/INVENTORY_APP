import React from 'react'
import ReactDOM from 'react-dom/client'
import General from './components/General'
import Education from './components/Education'
import Practical from './components/Practical'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <General />
    <Education />
    <Practical />
  </React.StrictMode>,
)
