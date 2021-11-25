import GetLecturersApi from "./secretary/api/LecturersApi/LecturersApi";
import GetSubjectsApi from "./secretary/api/SubjectsApi/SubjectsApi";
import { createContext } from "react";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    getLecturersApi: GetLecturersApi(),
    getSubjectsApi: GetSubjectsApi(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
