import {Button, Modal} from "antd";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {database} from "../../firebase/firebase";
import {ref} from "firebase/database";
import {  child, push, update } from "firebase/database";
import {fetchFirebaseData} from "../../redux/thunks/firebaseThunks";

const ModalCheckOut = ({
                           openCheckOut,
                           onOk,
                           disable,
                           onCancel,
                          roomId
                       }) => {
    const data = useSelector(state => state.checkIn)
    const db = database
    const dispatch = useDispatch()
    const handleSendData = () => {
        const dataCheckIn = data
        const dateOn = dataCheckIn.date.dateOn
        const dateOut = dataCheckIn.date.dateOut
        const name = dataCheckIn.name
        const postEntry = {
            dateOn:dateOn,
            dateOut:dateOut,
            Guest:name,
        }
        const updates = {};
        updates['/hotels/' + roomId   + '/Guest'] = postEntry.Guest;
        updates['/hotels/' + roomId   + '/dateOn'] = postEntry.dateOn;
        updates['/hotels/' + roomId   + '/dateOut'] = postEntry.dateOut;

        update(ref(db), updates)
            .then(() => {
                dispatch(fetchFirebaseData(roomId))
                console.log('Данные успешно обновлены');
            })
            .catch((error) => {
                // Обработка ошибок при обновлении данных
                console.error('Ошибка при обновлении данных:', error);
            });
        onOk(false)
        disable()

    }

    return (
        <>
            <Modal title="Basic Modal" open={openCheckOut}
                   onOk={() => {
                       handleSendData()

                   }} onCancel={onCancel}>
                <p>Желаете подтвердить бронирование?</p>
            </Modal>
        </>
    );
}
export default ModalCheckOut