import { useState, useEffect } from "react";
import axios from "axios";
import { toastError } from "../../../shareAll/toastMassage/toastMassage";

function LecturersApi() {
  const [Lecturers, setLecturers] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    try {
      const getLecturers = async () => {
        const res = await axios.get(
          "http://localhost:5000/import/getGiangVien"
        );
        setLecturers(res.data);
      };
      getLecturers();
    } catch (err) {
      toastError(err.message);
    }
  }, [callback]);

  return {
    getLecturers: [Lecturers, setLecturers],
    callback: [callback, setCallback],
  };
}
export default LecturersApi;
