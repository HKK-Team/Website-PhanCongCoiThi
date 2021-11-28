import React, {createContext, useState,useEffect} from 'react';
import ScheduleApi from './api/scheduleApi';
import RegistSubjectsAPI from './api/registSubjectsApi';

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const state = {
        ScheduleApi:ScheduleApi(),
        RegistSubjectsAPI:RegistSubjectsAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}