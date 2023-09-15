import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/auth';
import { useNavigate } from 'react-router-dom';
import '../../components/header.css'; // Импортируйте стили
import './UserProfile.css'; // Импортируйте стили для UserProfile (можете создать файл UserProfile.css)

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    return (
        <div className="user-profile d-flex justify-content-around">
            <div className="user-info">
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="user-avatar"
                />
                <div className="user-details">
                    <p className="user-name">{user.displayName}</p>
                    <p className="user-email">{user.email}</p>
                    {/* Добавьте другие данные о пользователе здесь */}
                </div>
            </div>
            <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleLogout}
            >
                Выйти
            </button>
        </div>
    );
};

export default UserProfile;
