import React, { useState } from 'react';

import './App.css';

import { Routes, Navigate, Route, useNavigate } from 'react-router-dom'
import { getFromLocalStorage, removeFromLocalStorage } from './myFn/localStorageFn';
import { TodosPage } from './Pages/TodosPage/TodosPage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { MyColorBtn } from './Components/MyColorBtn/MyColorBtn';




function App() {

  const isLoggin = getFromLocalStorage('isLoggin') === true

  const navigate = useNavigate()

  function logOut() {
    removeFromLocalStorage('isLoggin')
    navigate('/')
  }

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={isLoggin ? <TodosPage /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!isLoggin ? <LoginPage /> : <Navigate to={'/'} />} />
      </Routes>

    
      {isLoggin && <div className='btnWrapper'>
        <MyColorBtn color='blue' text='LOGOUT' callback={logOut} />
      </div>}
    </div>
  );
}

export default App;


