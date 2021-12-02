import { useState, useEffect } from "react";
import axios from "axios";

function ScheduleAPI() {
  const [schedule, setschedule] = useState([]);
  const [save, setSave] = useState("");
  const [search, setsearch] = useState("");


  useEffect(() => {
    const getschedule = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/schedule?${search}`
      );
      setschedule(res.data);
    };
    getschedule();
  }, [search]);

  return {
    schedule: [schedule, setschedule],
    search: [search, setsearch],
    save: [save, setSave],
  };
}
export default ScheduleAPI;
