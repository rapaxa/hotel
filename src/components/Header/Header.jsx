import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from "../../redux/slice/auth";
import {Link, useNavigate} from 'react-router-dom';
import './header.css'
import {StarFilled} from "@ant-design/icons";

const Header = () => {
    const numberOfComponents = 4;
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        if(user.isAuthenticated){
            dispatch(logout());
            navigate('/login');
        }else{
            navigate('/')
        }

    };
    console.log(user.isAuthenticated)

    return (
        <header className="header  bg-dark d-flex ">
            <div className="user container-md profile d-flex justify-content-between w-100 h-100 ">
                <div className="logo px-4 text-light d-flex flex-column align-items-center">
                <Link className="text-decoration-none text-white" to = "/">
                    <span className="logo-name d-flex justify-content-center ">Hotel</span>
                    <div className='d-flex flex-row justify-content-center '>
                        {Array.from({ length: numberOfComponents }, (_, index) => (
                            <StarFilled  style={{ fontSize: '10px', }} key={index} />
                        ))}
                    </div>
                </Link>

                </div>
                <div className="user-info d-flex align-items-center">
                    {user.isAuthenticated ?
                        <img
                            src={user.user.photoURL ? user.user.photoURL : '/img.png' }
                            alt={user.user.displayName}
                            className="user-avatar rounded-circle d-flex "
                        />
                    :
                    ""}

                    <button
                        className="btn text-light "
                        onClick={handleLogout}
                    >
                        {user.isAuthenticated? 'Log Out': 'Sign'}

                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;