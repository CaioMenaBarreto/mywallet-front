import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import Swal from "sweetalert2"

// Hook personalizado para realizar operação de cadastro
export function useSignUp() {
    const navigate = useNavigate()

    return (body) => {
        // Faz uma requisição POST para a API de cadastro
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/sign-up`, body)
            .then(res => navigate("/")) // Redireciona para a página inicial após o cadastro bem-sucedido
            .catch(err =>Swal.fire({
                text: `${err.response.data}`
            }))
    }
}

// Hook personalizado para realizar operação de login
export function useLogin() {
    const navigate = useNavigate()
    const { setToken, setUserName } = useContext(AuthContext)

    return (body) => {
        // Faz uma requisição POST para a API de login
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/`, body)
            .then(res => {
                // Atualiza o contexto de autenticação com o token e nome do usuário
                setToken(res.data.token)
                setUserName(res.data.userName)

                // Armazena o token e nome do usuário no armazenamento local
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userName", res.data.userName)

                // Redireciona para a página inicial após o login bem-sucedido
                navigate("/home")
            })
            .catch((err) => Swal.fire({
                text: `${err.response.data}`
            }))
    }
}

// Hook personalizado para realizar operação de logout
export function useLogout() {
    const { token, setToken, setUserName } = useContext(AuthContext)
    const navigate = useNavigate()

    // Limpa o contexto de autenticação e o armazenamento local
    return () => {
        setToken(undefined)
        setUserName(undefined)
        localStorage.clear()

        // Redireciona para a página inicial após o logout
        navigate("/")
    }
}