import './auth.css';
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {  loginSuccess } from "../../redux/slice/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
    });

    const { register, handleSubmit} = useForm({
        resolver: yupResolver(schema),
    });


    const handleLoginError = (error) => {
        console.error('Error:', error);
    };

    const signInWithEmail = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email
            };
            dispatch(loginSuccess(userData));
            navigate('/profile');
        } catch (error) {
            handleLoginError(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email
            };
            dispatch(loginSuccess(userData));
            navigate('/');
        } catch (error) {
            handleLoginError(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center w-100 h-100 ">
            <div className="main d-flex align-items-center justify-content-center w-100  ">
            <form className="w-100" onSubmit={handleSubmit(signInWithEmail)}>
                <div className="main container-lg bg-white w-50 h-50 p-3">
                <h5 className="d-flex align-self-start p-2">Авторизация</h5>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="username" className="col-sm-4 col-form-label">Username:</label>
                    <div className="col-sm-8">
                        <input {...register("email")} className="form-control" type="text" id="username" />
                    </div>
                </div>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="password" className="col-sm-4 col-form-label">Password:</label>
                    <div className="col-sm-8">
                        <input {...register("password")} className="form-control" type="password" id="password" />
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-left p-2">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
                <div className='btn-sign'>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <button onClick={signInWithGoogle} className="btn btn-danger">Sign with Google</button>
                </div>
                </div>
            </form>

            </div>
        </div>
    )
}

export default Auth;
