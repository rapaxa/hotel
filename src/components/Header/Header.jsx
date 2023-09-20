import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from "../../redux/slice/auth";
import {useNavigate} from 'react-router-dom';
import './header.css'
import {StarFilled} from "@ant-design/icons";

const Header = () => {
    const numberOfComponents = 4;
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };


    return (
        <header className="header  bg-dark d-flex ">
            <div className="user container-md profile d-flex justify-content-between w-100 h-100 ">
                <div className="logo px-4 text-light d-flex flex-column align-items-center">
                   <span className="logo-name d-flex justify-content-center">Hotel</span>
                    <div className='d-flex flex-row justify-content-center'>
                    {Array.from({ length: numberOfComponents }, (_, index) => (
                        <StarFilled  style={{ fontSize: '10px', }} key={index} />
                    ))}
                    </div>
                </div>
                <div className="user-info d-flex align-items-center">
                    <img
                        // src={user.photoURL}
                        // alt={user.displayName}
                        className="user-avatar rounded-circle d-flex "
                    />
                    <button
                        className="btn text-light "
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;