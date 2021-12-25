import { useState, useEffect } from "react";
import axios from "axios";

function SecretaryAPI() {
  const [users, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [secretary, setSecretary] = useState();
  useEffect(() => {
    const getSecretary = async () => {
      try {
        setUser(window.sessionStorage.getItem("SecretaryEmail"));
        const res = await axios.get(`/secretary/getuser?email[regex]=${users}`);
        setSecretary(res.data);
        setIsLogin(true);
      } catch (err) {
        return err.response.data.msg;
      }
    };
    getSecretary();
  }, [users]);
  return {
    secretary: [secretary, setSecretary],
    isLogin: [isLogin, setIsLogin],
    users: [users, setUser],
  };
}

export default SecretaryAPI;
