import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';
import Login from './pages/Login';
import Perfil from './pages/Perfil'; // <--- 1. IMPORTAR AQUI

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogar/:gameId" element={<GameRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} /> {/* <--- 2. ADICIONAR ESSA LINHA */}
      </Routes>
    </Router>
  );
}

export default App;