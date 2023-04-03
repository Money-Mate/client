import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function LayoutMain() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header/>
      <Main />
      <Footer/>
        </div>



  )
}

export default LayoutMain