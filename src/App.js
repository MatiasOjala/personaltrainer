import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Home from './components/Home';

function App() {




  return (
    <div className="App">
      <header className="App-header">
      <h1>Personal Trainer App</h1>
      </header>
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
            <Routes>
                <Route exact path="/"element={<Home />} />
                <Route path="/customers"element={<Customers />} />
                <Route path="/trainings"element={<Trainings />} />
            </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
