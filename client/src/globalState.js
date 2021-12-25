import React, {createContext} from 'react';
import ScheduleApi from './api/scheduleApi';
import RegistSubjectsAPI from './api/registSubjectsApi';
import LecturerApi from "./api/lecturersApi";
// import SecretaryApi from "./api/secretarysApi";

export const GlobalState = createContext()
export const DataProvider = ({children}) =>{
    const state = {
        lecturerApi : LecturerApi(),
        ScheduleApi:ScheduleApi(),
        RegistSubjectsAPI:RegistSubjectsAPI(),
        // secretaryApi : SecretaryApi(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}