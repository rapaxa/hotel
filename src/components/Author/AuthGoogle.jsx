import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, logout } from '../../redux/slice/auth';

const AuthGoogle = () => {

    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
            .then((result) => {
                // Успешная аутентификация через Google.
                const user = result.user;
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email:user.email
                };
                dispatch(loginSuccess(userData));
            })
            .catch((error) => {
                // Обработка ошибок аутентификации.
                dispatch(loginFailure(error));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h2 className="card-title mb-4">Авторизация через Google</h2>
                            <button
                                className="btn btn-primary btn-lg btn-block"
                                onClick={handleGoogleSignIn}
                            >
                                Войти с помощью Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthGoogle;

