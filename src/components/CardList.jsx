import React, { useEffect, useMemo, useState } from 'react';
import './CardList.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirebaseData } from '../redux/thunks/firebaseThunks';

const CardList = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchFirebaseData())
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [dispatch]);

    const data = useSelector((state) => state.db.data);

    const [selectedCard, setSelectedCard] = useState(null);
    const memoizedData = useMemo(() => data, [data]);

    const handleOpenInfo = (card) => {
        setSelectedCard(card);
    };

    const handleCloseInfo = () => {
        setSelectedCard(null);
    };

    return (
        <div className="card-list">
            {isLoading ? (
                <p>Loading data...</p>
            ) : (
                memoizedData.map((card) => (
                    <div className="card" key={card.id}>
                        <img src={card.imageUrl} alt={card.title} />
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <div className="button-container">
                            <Button variant="secondary" onClick={() => handleOpenInfo(card)}>
                                Открыть полную информацию
                            </Button>
                        </div>
                    </div>
                ))
            )}
            {selectedCard && (
                <div className="full-info-overlay">
                    <div className="full-info">
                        <img src={selectedCard.imageUrl} alt={selectedCard.title} />
                        <h3>{selectedCard.title}</h3>
                        <p>{selectedCard.description}</p>
                        <Button variant="danger" onClick={handleCloseInfo}>
                            Закрыть
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardList;
