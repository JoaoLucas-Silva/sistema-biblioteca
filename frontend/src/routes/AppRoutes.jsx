import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import Leitores from '../pages/Leitores';
import Emprestimos from '../pages/Emprestimos';
import Login from '../pages/Login';
import Livros from '../pages/Livros';


function PrivateRoute({ children }) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path="livros" element={<Livros />} />
					<Route path="leitores" element={<Leitores />} />
					<Route path="emprestimos" element={<Emprestimos />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}