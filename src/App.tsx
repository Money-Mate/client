import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Layout from './layouts/LayoutWholePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-screen">
      <Layout />
    </div>
  )
}

export default App
