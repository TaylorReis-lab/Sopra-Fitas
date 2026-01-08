import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, User, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Login com Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erro ao entrar: " + error.message);
    } else {
      alert("Bem-vindo de volta! 🎮");
      navigate('/');
    }
    setLoading(false);
  };

  const handleCadastro = async () => {
    setLoading(true);
    // Cadastro com Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
    } else {
      alert("Cadastro realizado! Verifique seu email para confirmar antes de entrar.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #121212, #1a1a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif', padding: '20px' }}>
      
      <div style={{ background: '#1e1e1e', padding: '40px', borderRadius: '20px', border: '1px solid #333', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative' }}>
        
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', color: '#aaa', cursor: 'pointer' }}>
            <ArrowLeft size={24} />
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ background: 'linear-gradient(45deg, #fca311, #ffc300)', padding: '15px', borderRadius: '50%', boxShadow: '0 0 15px rgba(255, 165, 0, 0.4)' }}>
                <Gamepad2 size={40} color="#1a1a2e" />
            </div>
        </div>

        <h2 style={{ color: '#fff', marginBottom: '5px', fontSize: '1.8rem' }}>Sopra Fitas</h2>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>Salva teu jogo, fera!</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ position: 'relative' }}>
            <User size={20} color="#666" style={{ position: 'absolute', left: '15px', top: '12px' }} />
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #333', background: '#252525', color: 'white', outline: 'none', fontSize: '1rem' }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#666" style={{ position: 'absolute', left: '15px', top: '12px' }} />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #333', background: '#252525', color: 'white', outline: 'none', fontSize: '1rem' }}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(45deg, #fca311, #ffc300)', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem', transition: 'transform 0.2s' }}
          >
            {loading ? 'Carregando...' : 'ENTRAR'}
          </button>
        </form>

        <div style={{ marginTop: '25px', borderTop: '1px solid #333', paddingTop: '20px' }}>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>Primeira vez aqui?</p>
          <button 
            onClick={handleCadastro}
            disabled={loading}
            style={{ background: 'transparent', border: '2px solid #333', color: '#ccc', padding: '8px 25px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            Criar Conta
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;