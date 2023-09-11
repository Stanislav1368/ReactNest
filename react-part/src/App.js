import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import './App.css'
import Settings from './pages/settings/Settings';
import UserProfile from './pages/profile/UserProfile';

const isAuthenticated = () => {
  const token = localStorage.getItem("token"); 
  return token;
};
const RequireAuth = ({children}) => {
  return isAuthenticated() ? (
    (children)
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  
  return (
    <div className='gradient-background'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>           
              <Route index 
                element={<RequireAuth><Home/></RequireAuth>}/>  
               
              <Route path='/users'  
                element={<RequireAuth><Users/></RequireAuth>}>
                
              </Route>
              <Route path='users/:id' element={
                  <RequireAuth>
                    <UserProfile></UserProfile>
                  </RequireAuth>
                }/>
              <Route path='/settings'  
                element={  
                  <RequireAuth>
                    <Settings/> 
                  </RequireAuth>                 
                }/>
              <Route path='/login'
                element={
                  <Login/>
                }/>
              <Route path='/registration'
                element={
                  <Registration/>
                }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>


      

  );
}

export default App;
