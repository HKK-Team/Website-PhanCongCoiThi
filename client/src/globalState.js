import React, {createContext} from 'react';
import LecturerApi from "./api/lecturersApi";
import SecretaryApi from "./api/secretarysApi";
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const state = {
        lecturerApi : LecturerApi(),
        secretaryApi : SecretaryApi(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}