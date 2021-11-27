import { useState, useEffect } from 'react'
import axios from 'axios'

function SecretaryAPI(token) {
    const [isLogin, setIsLogin] = useState(false)
    const [secretary, setSecretary] = useState([])
    const [idsecretary, setIdsecretary] = useState([])
    useEffect(() => {
        if (token) {
            const getSecretary = async() => {
                try {
                    const res = await axios.get('/secretary/infor', {
                        headers: { Authorization: token }
                    })
                    setSecretary(res.data)
                    setIsLogin(true)
                    setIdsecretary(res.data._id)
                } catch (err) {
                    return(err.response.data.msg)
                }
            }
            getSecretary()

        }
    }, [token])
    return {
        secretary: [secretary, setSecretary],
        isLogin: [isLogin, setIsLogin],
        idsecretary: [idsecretary, setIdsecretary]
    }
}

export default SecretaryAPI