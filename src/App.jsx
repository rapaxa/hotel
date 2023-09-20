import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import MainLayout from "./pages/MainLayout/MainLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./pages/auth/auth";
import SingleRoom from "./pages/SingleRoom/SingleRoom";
import Header from "./components/Header/Header";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="App">

            <Router>
                <Header/>
                <div className="container-md">
                <Routes>

                    {/* Маршрут для страницы авторизации */}
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
                    {/* Маршрут для страницы профиля */}
                    <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} />
                    {/* Маршрут по умолчанию, перенаправляющий на страницу авторизации */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/rooms" element={isAuthenticated ? <SingleRoom/>:<Navigate to="/login" /> } />
                </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;

