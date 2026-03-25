import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/public/Home';
import Login from './components/public/Login';
import Dashboard from './components/private/Dashboard';
import { IS_PRIVATE_MODE, IS_PUBLIC_MODE } from './config/runtime';

const isAuthenticated = () => localStorage.getItem('susan_2fa_token') !== null;

const PrivateRoute = ({ children }: { children: JSX.Element }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={IS_PUBLIC_MODE ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/susania/*" element={IS_PRIVATE_MODE ? <PrivateRoute><Dashboard /></PrivateRoute> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
