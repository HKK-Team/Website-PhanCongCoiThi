import { useState, useEffect } from 'react'
import axios from 'axios'

function ScheduleAPI() {
    const [schedule, setschedule] = useState([]);

    useEffect(() => {
        const getschedule = async() => {
            const res = await axios.get('http://localhost:5001/api/schedule')
            setschedule(res.data)
        }
        getschedule()

    }, [])
    return {
        schedule: [schedule, setschedule]
    }
}
export default ScheduleAPI