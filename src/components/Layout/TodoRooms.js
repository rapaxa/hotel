import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFirebaseData} from "../../redux/thunks/firebaseThunks";
import SingleRoom from "../../pages/SingleRoom/SingleRoom";
import {Link} from "react-router-dom";

const TodoRooms = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({start: 0, end: 10}); // Начальное и конечное значение для отображения
    const data = useSelector((state) => state.db.data);
    const memoizedData = useMemo(() => data, [data]);

    useEffect(() => {
        dispatch(fetchFirebaseData())
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setIsLoading(false);
            });
    }, [dispatch]);

    const handleShowMorePosts = () => {
        if (memoizedData.length <= post.end) {
            console.log('No more')
        } else {
            setPost({start: post.start + 10, end: post.end + 10});
        }

    };
    const handleShowBackPosts = () => {
        setPost({start: post.start - 10, end: post.end - 10});
    };


    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Type</th>
                    <th scope="col">Occupancy</th>
                    <th scope="col">Price</th>
                    <th scope="col">Guest</th>
                    <th scope="col">Select</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan="5">Loading data...</td>
                    </tr>
                ) : (
                    memoizedData.slice(post.start, post.end).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{item.Number}</th>
                            <td>{item.Type}</td>
                            <td>{item.Occupancy}</td>
                            <td>{item.Price}</td>
                            <td>{item.Guest}</td>
                            <td>
                                <Link to={`/rooms?roomId=${item.Number}`} className="btn btn-primary">More information</Link>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <button onClick={handleShowBackPosts}>{'<'}</button>
            <button onClick={handleShowMorePosts}>{'>'}</button>

        </>
    );
};

export default TodoRooms;
