import React from 'react';
import { IAppState } from './IAppState';

export const initialState : IAppState = {
    loggedIn: false,
    setloggedIn: () => {},
    buildings: [],
    setBuildings: () => {},
    amenities: [],
    setAmenities: () => {}
};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider;
