import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS original
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      {/* O ToastContainer fica aqui para ouvir os alertas de qualquer página */}
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </AuthProvider>
  );
}