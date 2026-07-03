import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [usuario, setUsuario] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUsuario = localStorage.getItem('usuario');

		if (storedToken) {
			setToken(storedToken);
		}

		if (storedUsuario) {
			setUsuario(JSON.parse(storedUsuario));
		}
	}, []);

	async function login(email, senha) {
		const response = await api.post('/auth/login', { email, senha });
		const { token: novoToken, usuario: novoUsuario } = response.data;

		localStorage.setItem('token', novoToken);
		localStorage.setItem('usuario', JSON.stringify(novoUsuario));

		setToken(novoToken);
		setUsuario(novoUsuario);

		return response.data;
	}

	function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		setToken(null);
		setUsuario(null);
	}

	return (
		<AuthContext.Provider
			value={{
				usuario,
				token,
				login,
				logout,
				isAuthenticated: Boolean(token),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error('useAuth deve ser usado dentro de AuthProvider.');
	}

	return context;
}
