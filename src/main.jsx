import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { appStore, persistor } from "./app/store.js"
import './index.css'
import App from './App.jsx'
import { PersistGate } from "redux-persist/integration/react";


createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

