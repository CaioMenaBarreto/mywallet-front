// Importa os hooks useContext e useEffect da biblioteca React
import { useContext, useEffect } from "react"
// Importa o hook useNavigate do React Router
import { useNavigate } from "react-router-dom"
// Importa o contexto de autenticação
import AuthContext from "../contexts/AuthContext"

// Função customizada para navegar rapidamente para a página inicial se o usuário estiver autenticado
export default function useQuickIn() {
    // Obtém o userName e token do contexto de autenticação
    const { userName, token } = useContext(AuthContext)
    
    // Utiliza o hook useNavigate para navegação programática
    const navigate = useNavigate()

    // Efeito colateral que verifica se há um token e um userName ao montar o componente
    useEffect(() => {
        // Se ambos token e userName estiverem presentes, redireciona para a página inicial
        if (token && userName) navigate("/home")
    }, [])// O efeito ocorre apenas uma vez no carregamento inicial
}