import React from 'react'
import axios from 'axios'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import  Navibar  from './components/layout/Navibar'
axios.defaults.withCredentials=true 


const App = () => {

  // useEffect(()=>{
  //   const getData=async()=>{
      
  //     const data = await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`)
  //     if(data.status==200){
  //       dispatch(login(data?.data))   
  //     }
  //   }
  //   getData()
  // },[])
  return (
    <div>
      <BrowserRouter>
        <Navibar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App