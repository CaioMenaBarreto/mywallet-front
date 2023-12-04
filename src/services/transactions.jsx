import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

// Hook personalizado para obter transações
export function useGetTransactions() {
    const [transactions, setTransactions] = useState(undefined)
    const { token } = useContext(AuthContext)

    // Configuração do cabeçalho para incluir o token de autorização
    const config = { headers: { Authorization: `Bearer ${token}` } }

    // Função para obter transações da API
    function getTransactions() {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions`, config)
            .then(res => setTransactions(res.data))
            .catch((err) => Swal.fire({
                text: `${err.response.data}`
            }))
    }
    
    // Efeito colateral para obter transações ao montar o componente
    useEffect(() => {
        getTransactions()
    }, [])

    // Retorna o estado das transações e a função para obter transações
    return { transactions, getTransactions }
}


// Hook personalizado para adicionar transação
export function useAddTransaction() {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    // Configuração do cabeçalho para incluir o token de autorização
    const config = { headers: { Authorization: `Bearer ${token}` } }

    // Função para adicionar uma nova transação à API
    return (body) => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions`, body, config)
            .then(res => navigate("/home"))
            .catch(err => Swal.fire({
                text: `${err.response.data}`
            }))
    }

}

// Hook personalizado para deletar transação
export function useDeleteTransaction() {
    const { token } = useContext(AuthContext)
    const config = { headers: { Authorization: `Bearer ${token}` } }

    // Função para deletar uma transação específica da API
    return (id, getTransactions) => {
            axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions/${id}`, config)
            .then(res => getTransactions())
            .catch(err => Swal.fire({
                text: `${err.response.data}`
            }))
    }
}

// Hook personalizado para editar transação
export function useEditTransaction() {
    const { token } = useContext(AuthContext)
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const navigate = useNavigate()

    // Função para editar uma transação específica na API
    return (id, body) => {
        axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions/${id}`, body, config)
            .then(res => navigate("/home"))
            .catch(err => Swal.fire({
                text: `${err.response.data}`
            }))
    }
}