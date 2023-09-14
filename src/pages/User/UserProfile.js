import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/auth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h2 className="card-title mb-4">Профиль пользователя</h2>
                            <div className="user-info">
                                <img
                                    src={user.photoURL} // Добавьте src для изображения пользователя
                                    alt={user.displayName}
                                    className="user-avatar img-fluid mb-3"
                                />
                                <div className="user-details">
                                    <p>
                                        <strong>Имя:</strong> {user.displayName}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
