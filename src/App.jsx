import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Ranking from './pages/Ranking';
import AdminMissoes from './pages/AdminMissoes'; // <--- O Painel do GM

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal (Home) */}
        <Route path="/" element={<Home />} />
        
        {/* Rota do Jogo */}
        <Route path="/jogar/:gameId" element={<GameRoom />} />
        
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota de Perfil */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Rota de Ranking */}
        <Route path="/ranking" element={<Ranking />} />

        {/* Rota de Admin (Painel do GM) */}
        <Route path="/admin" element={<AdminMissoes />} /> 
      </Routes>
    </Router>
  );
}

export default App;