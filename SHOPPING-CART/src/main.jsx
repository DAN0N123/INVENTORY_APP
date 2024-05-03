import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import Section1 from './components/Section1'
import ScrollingText from './components/ScrollingText'
import MainShowcase from './components/MainShowcase'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Section1 />
    <ScrollingText />
    <MainShowcase />
  </React.StrictMode>,
)
