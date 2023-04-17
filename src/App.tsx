import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Layout from './layouts/LayoutWholePage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import routes from './routes/routes'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="App w-screen">
      <Layout />
      <Routes>
        {routes.map((route) => {
          return route.isProtected ? (
            <Route
              key={route.id}
              path={route.path}
              element={isLoggedIn ? (
                  route.element
                ) : (
                  // use navigate function instead of Navigate component
                  () => {
                    navigate(route.redirectPath, { replace: true });
                    return null;
                  }
                )
              }
            />
          ) : (
            <Route key={route.id} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  )
}

export default App
