import React from 'react';
import {useLocation} from "react-router-dom";

const SingleRoom =(props)=> {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomId = searchParams.get('roomId');



    return (
        <div>
            <h1>Страница комнаты {roomId}</h1>
            {/* Ваш контент для страницы комнаты */}
        </div>
    );
}

export default SingleRoom;