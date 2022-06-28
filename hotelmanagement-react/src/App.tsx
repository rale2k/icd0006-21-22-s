import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Dashboard from './views/Dashboard';
import Home from './views/Home';
import { AppContextProvider, initialState } from './state/AppContext';
import { IHotel } from './domain/IHotel';

function App() {
    const setloggedIn = (loggedIn: boolean) =>
            setAppState({ ...appState, loggedIn });

    const setHotels = (hotels: IHotel[]) =>
            setAppState({ ...appState, hotels });

    const [appState, setAppState] = useState({ ...initialState, setloggedIn, setHotels });

    return (
        <div className="App">
        <AppContextProvider value={appState}>
            <Routes>
                <Route path="/*" element={ <Home /> } />
                <Route path="/dashboard/*" element={ <Dashboard />} />
            </Routes>
        </AppContextProvider>
        </div>
    );
}

export default App;
