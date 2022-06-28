import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import AdminDashboard from './views/AdminDashboard';
import Home from './views/Home';
import { AppContextProvider, initialState } from './state/AppContext';
import { IBuilding } from './domain/IBuilding';
import { IAmenity } from './domain/IAmenity';
import UserDashboard from './views/UserDashBoard';

function App() {
    const setloggedIn = (loggedIn: boolean) =>
            setAppState({ ...appState, loggedIn });

    const setBuildings = (buildings: IBuilding[]) =>
            setAppState({ ...appState, buildings: buildings });

    const setAmenities = (amenities: IAmenity[]) =>
            setAppState({ ...appState, amenities: amenities });

    const [appState, setAppState] = useState({ ...initialState, setloggedIn, setBuildings, setAmenities });

    return (
        <div className="App">
        <AppContextProvider value={appState}>
            <Routes>
                <Route path="/*" element={ <Home /> } />
                <Route path="/dashboard/*" element={
                    <React.Suspense fallback={<>...</>}>
                        <AdminDashboard />
                    </React.Suspense>
                    } 
                />
                <Route path="/dashboard/user/*" element={
                    <React.Suspense fallback={<>...</>}>
                        <UserDashboard />
                    </React.Suspense>
                    } 
                />
            </Routes>
        </AppContextProvider>
        </div>
    );
}

export default App;
