import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function LayoutMain() {
  return (
    <div className="grid grid-cols-12 h-screen bg-blue-200">
        <Header />
        <Main />
        {/* <Footer /> */}
        </div>



  )
}

export default LayoutMain