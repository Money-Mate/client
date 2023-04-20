import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate= useNavigate()
  return (
    <div>LandingPage
      <button onClick={()=> navigate(`/signin`) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SignIn</button>
      <button onClick={()=> navigate(`/signup`) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
      <button onClick={()=> navigate(`/app/userdashboard`) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Dashboard</button>
    </div>
  )
}

export default LandingPage