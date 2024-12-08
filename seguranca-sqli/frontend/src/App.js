import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';  // Importa o arquivo CSS

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <h1>Meu Site</h1>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
