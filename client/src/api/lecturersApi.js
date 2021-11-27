import { useState, useEffect} from 'react'
import axios from 'axios'
function LecturersAPI() {
    const [users,setUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false)
    const [lecturer, setLecturer] = useState([])
    useEffect(() => {
            const getLecturer = async() => {
                try {
                    setUser(window.localStorage.getItem("email"));
                    const res = await axios.get(`/lecturer/getuser?email[regex]=${users}`);
                    setLecturer(res.data)
                    setIsLogin(true)
                } catch (err) {
                    return(err.response.data.msg)
                }
            }
            getLecturer()
    },[users])



    return {
        lecturer: [lecturer, setLecturer],
        isLogin: [isLogin, setIsLogin],
        users : [users,setUser],
    }
}

export default LecturersAPI