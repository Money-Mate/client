import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SignIn />
    </div>
  )
}

export default App
