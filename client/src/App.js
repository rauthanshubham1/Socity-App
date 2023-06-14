import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage"
import { Route, Routes } from "react-router-dom"


const App = () => {
  return (
    <>
      {/* <MainPage /> */}
      {true ?
        <Routes>
          <Route exact path='/' element={<LoginPage />}></Route>
          <Route exact path='/signup' element={<SignupPage />}></Route>
        </Routes>
        :
        <div>Hello</div>
      }



    </>
  )
}

export default App;