import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Ranking from './pages/Ranking';

// Importações da Área Administrativa (GM)
import AdminDashboard from './pages/AdminDashboard'; // O portal central
import AdminMissoes from './pages/AdminMissoes';
import AdminJogos from './pages/AdminJogos';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminDesafios from './pages/AdminDesafios'; // <-- IMPORTADO PARA FUNCIONAR O CLIQUE

function App() {
  return (
    <Router>
      <Routes>
        {/* ==============================
            ROTAS PÚBLICAS E DO JOGADOR
           ============================== */}

        <Route path="/" element={<Home />} />
        <Route path="/jogar/:gameId" element={<GameRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ranking" element={<Ranking />} />

        {/* ==============================
            ROTAS EXCLUSIVAS DO ADMIN (GM)
           ============================== */}

        {/* Painel Central do Administrador */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Lançar Desafios Globais (Novas missões do topo) */}
        <Route path="/admin-desafios" element={<AdminDesafios />} />

        {/* Validação de Missões (Prints enviados pelos players) */}
        <Route path="/admin-missoes" element={<AdminMissoes />} />

        {/* Painel para Upar e Gerenciar Jogos */}
        <Route path="/painel-admin-jogos" element={<AdminJogos />} />

        {/* Controle de Usuários */}
        <Route path="/admin-usuarios" element={<AdminUsuarios />} />
      </Routes>
    </Router>
  );
}

export default App;