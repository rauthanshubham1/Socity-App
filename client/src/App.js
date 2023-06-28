import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage"
import { Route, Routes } from "react-router-dom"
import Feed from './components/Feed';
import Profile from './components/Profile';
import AllMessages from './components/AllMessages';
import LogoutPage from './Pages/LogoutPage/LogoutPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import SearchedUser from './Pages/SearchedUser/SearchedUser';
const App = () => {

  return (
    <Routes >
      <Route exact path='/' element={<LoginPage />}></Route>
      <Route exact path='/signup' element={<SignupPage />}></Route>
      <Route exact path='/searchedUser' element={<SearchedUser />}></Route >
      < Route path='/user' element={< MainPage />}>
        <Route index path='feed' element={<Feed />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='messages' element={<AllMessages />}></Route>
      </Route >
      <Route path='/logout' element={<LogoutPage />}></Route>
      <Route path='/*' element={<ErrorPage />}></Route>
    </Routes>
  )
}
export default App;