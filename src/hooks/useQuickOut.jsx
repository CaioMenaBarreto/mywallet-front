// Importa os hooks useContext, useEffect e useState da biblioteca React
import { useContext, useEffect, useState } from "react"

// Importa o contexto de autenticação
import AuthContext from "../contexts/AuthContext"

// Importa o componente UsePromptLogin para exibir um prompt de login
import UsePromptLogin from "../components/usePrompt";


// Função customizada para verificar se o usuário está autenticado e exibir um prompt de login se não estiver
export default function useQuickOut() {
    // Obtém o userName e token do contexto de autenticação
    const { userName, token } = useContext(AuthContext);

    // Estado para controlar a exibição do prompt de login
    const [showPrompt, setShowPrompt] = useState(false);

    // Efeito colateral que verifica se há um token e um userName ao montar o componente
    useEffect(() => {
        if (!token || !userName) {
            // Se o usuário não estiver logado, exibe o componente UsePromptLogin
            setShowPrompt(true);
        }
    }, [token, userName]);

    // Retornar algo se necessário, por exemplo, null ou um componente padrão
    return showPrompt ? <UsePromptLogin /> : null;
}