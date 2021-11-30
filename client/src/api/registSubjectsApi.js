import { useState, useEffect } from 'react'
import axios from 'axios'

function RegistSubjectsAPI() {
    const [rgSubjects, setrgSubjects] = useState([]);

    useEffect(() => {
        const getdata = async() => {
            const res = await axios.get('http://localhost:5000/api/rgsubjects')
            setrgSubjects(res.data)
        }
        getdata()

    }, [])
    return {
        rgSubjects:[rgSubjects, setrgSubjects] 
    }
}
export default RegistSubjectsAPI