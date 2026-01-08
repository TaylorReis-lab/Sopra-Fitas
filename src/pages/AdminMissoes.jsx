import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, User, Gamepad2, Shield, Coins } from 'lucide-react';

const AdminMissoes = () => {
  const [missoes, setMissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pontosInput, setPontosInput] = useState({});

  useEffect(() => {
    fetchMissoesPendentes();
  }, []);

  const fetchMissoesPendentes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('missoes')
      .select(`*, profiles (nome, email)`)
      .eq('status', 'pendente')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMissoes(data);
      const iniciais = {};
      data.forEach(m => iniciais[m.id] = 500);
      setPontosInput(iniciais);
    }
    setLoading(false);
  };

  const handlePontosChange = (id, valor) => {
    setPontosInput(prev => ({ ...prev, [id]: valor }));
  };

  const aprovarMissao = async (missao) => {
    const pontosParaDar = parseInt(pontosInput[missao.id]) || 0;
    
    if (pontosParaDar <= 0) return alert("Valor inválido!");
    if (!window.confirm(`Confirmar depósito de ${pontosParaDar} pontos?`)) return;

    try {
      // Chama a função SQL corrigida
      const { error } = await supabase.rpc('aprovar_missao_gm', {
        id_missao: missao.id,
        id_jogador: missao.user_id,
        qtd_pontos: pontosParaDar
      });

      if (error) throw error;

      alert("✅ PONTOS DEPOSITADOS COM SUCESSO!");
      fetchMissoesPendentes(); 

    } catch (error) {
      alert('Erro no Banco: ' + error.message);
    }
  };

  const rejeitarMissao = async (id) => {
    if (!window.confirm("Rejeitar print?")) return;
    await supabase.from('missoes').update({ status: 'rejeitado' }).eq('id', id);
    fetchMissoesPendentes();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/perfil" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
          <ArrowLeft size={18} /> Voltar
        </Link>
        <h2 style={{ color: '#fca311' }}>Sala de Controle (GM)</h2>

        {loading ? <p>Carregando...</p> : missoes.length === 0 ? <p>Nenhum print pendente.</p> : (
          missoes.map(m => (
            <div key={m.id} style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span><strong>Usuário:</strong> {m.profiles?.nome || 'Jogador'}</span>
                <span style={{ color: '#fca311' }}>{m.game_nome}</span>
              </div>
              <img src={m.print_url} style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }} alt="prova" />
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                <Coins size={18} color="#fca311" />
                <span>Dar Pontos:</span>
                <input 
                  type="number" 
                  value={pontosInput[m.id]} 
                  onChange={(e) => handlePontosChange(m.id, e.target.value)}
                  style={{ width: '80px', background: '#333', color: '#fff', border: '1px solid #555', padding: '5px', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => rejeitarMissao(m.id)} style={{ padding: '10px', background: '#441111', color: '#ff4d4d', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>REJEITAR</button>
                <button onClick={() => aprovarMissao(m)} style={{ padding: '10px', background: '#114411', color: '#4caf50', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>APROVAR E DAR PONTOS</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMissoes;