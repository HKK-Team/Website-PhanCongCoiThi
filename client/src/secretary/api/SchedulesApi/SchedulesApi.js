import { useState, useEffect } from "react";
import axios from "axios";
import { toastError } from "../../../shareAll/toastMassage/toastMassage";

function SchedulesApi() {
  const [ schedules, setSchedules] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    try {
      const getSchedules = async () => {
        const res = await axios.get(
          "http://localhost:5000/import/getLichthi"
        );
        setSchedules(res.data);
      };
      getSchedules();
    } catch (err) {
      toastError(err.message);
    }
  }, [callback]);

  return {
    getSchedules: [schedules, setSchedules],
    callback: [callback, setCallback],
  };
}
export default SchedulesApi;
