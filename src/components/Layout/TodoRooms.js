import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFirebaseData} from "../../redux/thunks/firebaseThunks";
import {Link} from "react-router-dom";

const TodoRooms = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0); // Текущая страница
    const itemsPerPage = 10; // Количество элементов на странице
    const data = useSelector((state) => state.db.data);
    const memoizedData = useMemo(() => data, [data]);

    useEffect(() => {
        dispatch(fetchFirebaseData())
            .then((data) => {
                console.log(data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setIsLoading(false);
            });
    }, [dispatch]);

    const totalPages = memoizedData ? Math.ceil(memoizedData.length / itemsPerPage) : 0;


    const handleShowMorePosts = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handleShowBackPosts = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    const handlePageClick = (newPage) => {
        setPage(newPage);
    };
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageNumbers = totalPages > 0 ? Array.from({length: totalPages}, (_, index) => index) : [];


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
                    memoizedData.slice(startIndex, endIndex).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{item.Number}</th>
                            <td>{item.Type}</td>
                            <td>{item.Occupancy}</td>
                            <td>{item.Price}</td>
                            <td>{item.Guest}</td>
                            <td>
                                <Link
                                    to={`/rooms?roomId=${item.Number}`}
                                    className="btn btn-primary"
                                >
                                    More information
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <button
                onClick={handleShowBackPosts}
                disabled={page === 0}
                className="btn btn-primary"
            >
                {"<"}
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`btn ${pageNumber === page ? "btn-secondary" : "btn-primary active"}`}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button
                onClick={handleShowMorePosts}
                disabled={page === totalPages - 1}
                className="btn btn-primary"
            >
                {">"}
            </button>

        </>

    );
};

export default TodoRooms;
