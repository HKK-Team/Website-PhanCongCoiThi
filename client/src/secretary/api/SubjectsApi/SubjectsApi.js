import { useState, useEffect } from "react";
import axios from "axios";
import { toastError } from "../../../shareAll/toastMassage/toastMassage";

function SubjectsApi() {
  const [subjects, setSubjects] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    try {
      const getSubjects = async () => {
        const res = await axios.get(
          "http://localhost:5000/import/getMonThi"
        );
        setSubjects(res.data);
      };
      getSubjects();
    } catch (err) {
      toastError(err.message);
    }
  }, [callback]);

  return {
    getSubjects: [subjects, setSubjects],
    callback: [callback, setCallback],
  };
}
export default SubjectsApi;