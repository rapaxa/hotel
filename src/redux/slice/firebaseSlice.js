// firebaseSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchFirebaseData } from '../thunks/firebaseThunks'; // Импортируйте Thunk

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        data: null, // Начальное состояние без данных
        status: 'idle', // Статус асинхронной операции ('idle', 'loading', 'succeeded', 'failed')
        error: null, // Ошибка, если операция завершилась с ошибкой
        database: null, // Этот объект должен быть настроен на вашей стороне
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
