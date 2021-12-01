import { useContext } from "react";
import { GlobalState } from "./../globalState";

export var getdata = {};
export default function GetData() {
  const state = useContext(GlobalState);
  const [getLecturersApi] = state.getLecturersApi.getLecturers;
  const [getSubjectApi] = state.getSubjectsApi.getSubjects;
  const [getSchedulesApi] = state.getSchedulesApi.getSchedules;
  getdata = {
    getLecturersApi: [...getLecturersApi],
    getSubjectApi: [...getSubjectApi],
    getSchedulesApi : [...getSchedulesApi]
  };
  return getdata;
}
