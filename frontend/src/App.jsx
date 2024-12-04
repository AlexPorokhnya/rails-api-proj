import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Content from './component/Content'

function App() {


  return (
    <>
      <Navbar />
      <Content />
      <Footer />  
    </>
  )
}

export default App
