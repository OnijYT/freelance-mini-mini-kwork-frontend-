import { useState } from 'react'
import Header from './assets/header/header'
import './styles/global.css'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateProvider } from './context/PrivateAuth'
import Jobcreate from './assets/home/jobcreate'
import Joblist from './assets/home/joblist'
import Login from './assets/auth/login/Login'
import Register from './assets/auth/register/register'

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <div style={{ padding: '20px 24px' }}>
            <Header />
              
            <Routes>
              <Route path='/' element={<Joblist />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>

              <Route
                path='/create-job'
                element={
                  <PrivateProvider>
                    <Jobcreate />
                  </PrivateProvider>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
    </AuthProvider>
  )

}

export default App
