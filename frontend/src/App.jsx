import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Content from './component/Content'

function App() {


  return (
    <>
    <div className='d-flex'>
        <Navbar />
        <div className='ms-4'>
        <Content />
      </div>
    </div>
      <Footer />  
    </>
  )
}

export default App
