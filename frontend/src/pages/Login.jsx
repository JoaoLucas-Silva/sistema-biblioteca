import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            // Tenta fazer o login
            await login(email, senha);
            
            // Se passar da linha acima, deu certo!
            toast.success('Login realizado com sucesso!');
            navigate('/');
        } catch (error) {
            // Se o axios retornar erro (ex: 401 Unauthorized), cai aqui
            console.error("Detalhes do erro:", error);
            toast.error('E-mail ou senha incorretos. Tente novamente.');
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <form 
                onSubmit={handleLogin} 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px', 
                    padding: '32px', 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#111827' }}>Entrar</h1>
                <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '16px', marginTop: 0 }}>
                    Acesse o painel da biblioteca
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.9rem', color: '#374151' }}>E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="admin@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="senha" style={{ fontSize: '0.9rem', color: '#374151' }}>Senha</label>
                    <input
                        id="senha"
                        type="password"
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <button 
                    type="submit" 
                    style={{ 
                        padding: '12px', 
                        marginTop: '8px', 
                        backgroundColor: '#2563eb', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Entrar no sistema
                </button>
            </form>
        </div>
    );
}