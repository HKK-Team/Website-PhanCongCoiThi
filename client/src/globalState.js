import React, {createContext} from 'react';
import ScheduleApi from './api/scheduleApi';
import RegistSubjectsAPI from './api/registSubjectsApi';
import LecturerApi from "./api/lecturersApi";
import SecretaryApi from "./api/secretarysApi";
import GetLecturersApi from "./secretary/api/LecturersApi/LecturersApi";
import GetSubjectsApi from "./secretary/api/SubjectsApi/SubjectsApi";
import GetSchedulesApi from "./secretary/api/SchedulesApi/SchedulesApi";

export const GlobalState = createContext()
export const DataProvider = ({children}) =>{
    const state = {
        lecturerApi : LecturerApi(),
        ScheduleApi:ScheduleApi(),
        RegistSubjectsAPI:RegistSubjectsAPI(),
        secretaryApi : SecretaryApi(),
        getLecturersApi: GetLecturersApi(),
        getSubjectsApi: GetSubjectsApi(),
        getSchedulesApi: GetSchedulesApi(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}