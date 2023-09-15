// firebaseSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchFirebaseData } from '../thunks/firebaseThunks';

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        database: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirebaseData.pending, (state) => {
                state.status = 'loading'; // Загрузка началась
            })
            .addCase(fetchFirebaseData.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Загрузка завершена успешно
                state.data = action.payload; // Сохранение данных в хранилище
            })
            .addCase(fetchFirebaseData.rejected, (state, action) => {
                state.status = 'failed'; // Загрузка завершилась с ошибкой
                state.error = action.error.message;
            });
    },
});


export default firebaseSlice.reducer;
