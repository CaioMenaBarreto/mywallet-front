import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import Swal from "sweetalert2"

export function useSignUp() {
    const navigate = useNavigate()

    return (body) => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/sign-up`, body)
            .then(res => navigate("/"))
            .catch(err =>Swal.fire({
                text: `${err.response.data}`
            }))
    }
}

export function useLogin() {
    const navigate = useNavigate()
    const { setToken, setUserName } = useContext(AuthContext)

    return (body) => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/`, body)
            .then(res => {
                setToken(res.data.token)
                setUserName(res.data.userName)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userName", res.data.userName)
                navigate("/home")
            })
            .catch((err) => Swal.fire({
                text: `${err.response.data}`
            }))
    }
}

export function useLogout() {
    const { token, setToken, setUserName } = useContext(AuthContext)
    const navigate = useNavigate()

    return () => {
        setToken(undefined)
        setUserName(undefined)
        localStorage.clear()
        navigate("/")
    }
}