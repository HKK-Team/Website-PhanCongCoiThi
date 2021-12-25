import { useContext } from "react";
import { GlobalState } from "../globalState";


export var getdata ={}; // khởi tạo array object chứa các mảng dữ liệu
export default function GetData(){
  const state = useContext(GlobalState);
  const [schedule] = state.ScheduleApi.schedule;
  const [rgSubjects] = state.RegistSubjectsAPI.rgSubjects;
  // const [getLecturersApi] = state.getLecturersApi.getLecturers;
  const [getSubjectApi] = state.getSubjectsApi.getSubjects;
  const [getSchedulesApi] = state.getSchedulesApi.getSchedules;
  
  getdata ={
    schedule : [...schedule],
    rgSubjects: [...rgSubjects],
    getLecturersApi: [],
    getSubjectApi: [...getSubjectApi],
    getSchedulesApi : [...getSchedulesApi]
  }   
  return getdata;
} 