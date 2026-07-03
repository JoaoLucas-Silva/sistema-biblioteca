import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
	const { logout } = useAuth();

	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<nav
				style={{
					width: '220px',
					padding: '24px',
					borderRight: '1px solid #ddd',
					display: 'flex',
					flexDirection: 'column',
					gap: '12px',
				}}
			>
				<Link to="/">Dashboard</Link>
				<Link to="/livros">Livros</Link>
				<Link to="/leitores">Leitores</Link>
				<Link to="/emprestimos">Empréstimos</Link>
				<button type="button" onClick={logout} style={{ marginTop: '12px' }}>
					Sair
				</button>
			</nav>

			<main style={{ flex: 1, padding: '24px' }}>
				<Outlet />
			</main>
		</div>
	);
}