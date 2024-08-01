// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Login from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import CreateMovie from './components/CreateMovie';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/add-movies" element={<CreateMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
