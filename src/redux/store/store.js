import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from '../slice/auth';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
});

// Создайте конфигурацию для redux-persist
const persistConfig = {
    key: 'root',
    storage, // Указываем хранилище
    whitelist: ['isAuthenticated', 'user'], // Укажите здесь имена срезов, которые нужно сохранить
};

// Оберните ваш срез auth в redux-persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: customizedMiddleware,
});

export const persistor = persistStore(store);
