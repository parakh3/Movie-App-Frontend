// src/App.js
import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'

import './App.css';
import Login from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import CreateMovie from './components/CreateMovie';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Login />} key="LandingPage" />

        <Route path="/login" key="login" element={<Login />} />
        <Route path="/movies" element={<MoviePage />} key="MoviePage" />
        <Route path="/add-movies" element={<CreateMovie />} key="CreateMovie" />
      </Routes>
    </div>
  );
}

export default App;
