
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LogOut } from './redux/actions/authActions';
import PrivateRoute from './components/Auth/privateRoute';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import Users from './pages/UsersPages';
import AuthService from './services/AuthService';
import { Button } from '@mui/material';
function App() {
    const LogedIn = useSelector((state: RootState) => state.auth.value);
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(LogOut());
        AuthService.logout();
    }

  return (
      <>
          {LogedIn ? <Button variant="outlined" color="error" onClick={() => { logout() }}>Logut</Button>  : null }
          
          <Router>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </Router>

    </>
  )
}

export default App
