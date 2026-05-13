import { useState } from 'react'
import Header from './assets/header/header'
import './styles/global.css'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateProvider } from './context/PrivateAuth'
import Jobcreate from './assets/home/jobcreate/jobcreate'
import Joblist from './assets/home/joblist/joblist'
import Login from './assets/auth/login/Login'
import Register from './assets/auth/register/register'
import OneJob from './assets/home/onejob/OneJob'
import MyJobs from './assets/home/myjobs/myjobsPage'

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
              <Route path='/jobs/:id' element={<OneJob />} />
              <Route path='/my-jobs' element={<MyJobs />} />

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
