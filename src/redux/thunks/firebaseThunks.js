
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, onValue } from 'firebase/database';
import {database} from "../../firebase/firebase";

export const fetchFirebaseData = createAsyncThunk (
    'firebase/fetchData',
    async (_, thunkAPI) => {
       try {
            const dataBaseRef = ref(database, `/hotels/`);
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
