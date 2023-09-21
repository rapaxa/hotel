
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, onValue } from 'firebase/database';
import {database} from "../../firebase/firebase";

export const fetchFirebaseData = createAsyncThunk(
    'firebase/fetchData',
    async (roomId, thunkAPI) => {
        try {
            console.log(roomId)
            if(roomId === undefined){
                roomId = ''
            }
            const dataBaseRef = ref(database, `/hotels/${roomId}`); // Измените путь, чтобы загрузить только данные для конкретной комнаты
            return new Promise((resolve, reject) => {
                onValue(dataBaseRef, (snapshot) => {
                    const data = snapshot.val();
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        } catch (error) {
            throw error;
        }
    }
);
