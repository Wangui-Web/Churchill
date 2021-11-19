import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home';
import Register from './Component/Register';
import Admin from './Component/Admin';
import Customer from './Component/Customer';
import Event from './Component/Event';
import Payment from './Component/Payment';

function App() {
  return (
    
    <div className="App">
      <Router>
         
        <Routes>
          <Route path="/home" element={ <Home/>}/>
          <Route path="/" element={ <Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/addevents" element={<Event />} />
          <Route path="/payments" element={ <Payment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
