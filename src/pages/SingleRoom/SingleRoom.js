import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {HomeFilled} from "@ant-design/icons";
import {NavLink} from "react-bootstrap";

const SingleRoom =(props)=> {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomId = searchParams.get('roomId');
    return (
        <div>
             <section className="Back d-flex align-content-center align-items-center px-3">
                 <Link to ="/" className="d-flex align-content-center align-items-center text-decoration-none">
                 <HomeFilled style={{color:"blue"}}/>
                 <span style={{color:"blue"}}>Back Home</span>
                 </Link>
             </section>
            <section className="data-room d-flex w-100 justify-content-between">
                <section className="d-flex w-50 d-flex ">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        style={{width:"100%",height:"100%"}}
                    />
                    <div className="d-flex flex-column">
                        <h5>Room {roomId}</h5>
                    <ul className="list-group">
                        <li  className="list-group-item">Type:</li>
                        <li className="list-group-item">Occupancy:</li>
                        <li className="list-group-item">Price:</li>
                        <li className="list-group-item">Quest:</li>
                    </ul>
                    </div>
                </section>
                <section className="d-flex flex-column check-out w-25 ">
                    <div className="btn-group d-flex justify-content-end">
                        <button>Check In</button>
                        <button>Check Out</button>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="d-flex justify-content-start">Features:</h5>
                        <p className="d-flex justify-content-start">Describe</p>
                    </div>
                </section>
                </section>
                <section>
                    <div className="describe d-flex">
                        <h5 className="d-flex justify-content-start">Description:</h5>
                        <p className="d-flex text-start flex-column justify-content-start">Добро пожаловать в наши уникальные люкс-апартаменты,
                            которые предлагают вам невероятный опыт проживания в самом сердце курортного города.
                            Находясь всего в нескольких шагах от пляжа,
                            эти апартаменты обеспечивают комбинацию роскоши, комфорта и потрясающего побережья.</p>
                    </div>
                </section>



        </div>
    );
}

export default SingleRoom;