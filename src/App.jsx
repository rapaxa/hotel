import './App.css';
import AuthGoogle from "./components/Author/AuthGoogle";
import Register from "./components/Author/RegistrNewUser";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import MainLayout from "./pages/MainLayout/MainLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthLoginWithPas from "./components/Author/AuthLoginWithPas";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Маршрут для страницы авторизации */}
                    <Route path="/auth" element={isAuthenticated ? <Navigate to="/profile" /> : <AuthLoginWithPas />} />

                    {/* Маршрут для страницы профиля */}
                    <Route path="/profile" element={isAuthenticated ? <MainLayout /> : <Navigate to="/auth" />} />

                    {/* Маршрут по умолчанию, перенаправляющий на страницу авторизации */}
                    <Route path="/" element={<Navigate to="/auth" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

