import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";
import navbarReducer from "../features/navbarSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const appStore = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    navbarToggle: navbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, courseApi.middleware),
});

export const persistor = persistStore(appStore);



// import {configureStore} from "@reduxjs/toolkit";
// import authReducer from '../features/authSlice.js';
// import { authApi } from "../features/api/authApi.js";
// import { courseApi } from "../features/api/courseApi.js";
// import navbarReducer from '../features/navbarSlice.js';

// export const appStore = configureStore({
//     reducer:{
//         auth : authReducer,
//         [authApi.reducerPath] : authApi.reducer,
//         [courseApi.reducerPath]:courseApi.reducer,
//         navbarToggle:navbarReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         // getDefaultMiddleware().concat(authApi.middleware)
//     getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
// });