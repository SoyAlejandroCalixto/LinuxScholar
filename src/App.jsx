import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/home'

export const appContext = React.createContext()

function App() {

  const todayPlus3Years = new Date();
  todayPlus3Years.setFullYear(todayPlus3Years.getFullYear() + 3);
  const [isLightModeOn, setIsLightModeOn] = React.useState(document.cookie === `theme=light` ? true : false)

  React.useEffect(()=>{
    document.body.className = isLightModeOn ? 'light' : 'dark'
  },[isLightModeOn])
  

  return (
    <>
      <div className='App'>
        <appContext.Provider value={{isLightModeOn, setIsLightModeOn}}>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </appContext.Provider> 
      </div>
    </>
  )
}

export default App
