import React, {createContext, useState,useEffect} from 'react';
import LecturerApi from "./api/lecturersApi";
import SecretaryApi from "./api/secretarysApi";
import axios from "axios";
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [tokenn,setTokenn] = useState(false)
    useEffect(() =>{
        // token login admin
        const secretarylogin = localStorage.getItem('SecretaryLogin')
        if(secretarylogin){
            const refreshToken = async () =>{
                const res = await axios.get('/secretary/refresh_token')
                setTokenn(res.data.accesstoken)
                setTimeout(() =>{
                    refreshToken()
                },10 * 60 *1000)
            }
            refreshToken()
        }
    },[])
    const state = {
        lecturerApi : LecturerApi(),
        tokenn :[tokenn,setTokenn],
        secretaryApi : SecretaryApi(tokenn),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}