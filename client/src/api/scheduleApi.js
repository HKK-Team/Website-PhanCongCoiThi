import { useState, useEffect } from 'react'
import axios from 'axios'

function ScheduleAPI() {
    const [schedule, setschedule] = useState([]);
    const [searchLecturerId, setsearchLecturerId] = useState("");
    const [searchClassName, setsearchClassName] = useState("");

    useEffect(() => {
        const getschedule = async() => {
            const res = await axios.get(`http://localhost:5000/api/schedule?${searchLecturerId}`)
            setschedule(res.data)
        }
        getschedule()

    }, [searchLecturerId])

    useEffect(() => {
        const getschedulebyclassname = async() => {
            const res = await axios.get(`http://localhost:5000/api/schedule?${searchClassName}`)
            setsearchClassName(res.data)
        }
        getschedulebyclassname()

    }, [searchClassName])
    
    return {
        schedule: [schedule, setschedule],
        searchLecturerId:[searchLecturerId, setsearchLecturerId],
        searchClassName: [searchClassName, setsearchClassName]
    }
}
export default ScheduleAPI