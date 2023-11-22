import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import styled from "styled-components";
import UsePromptLogin from "../components/usePrompt";

export default function useQuickOut() {
    const { userName, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        if (!token || !userName) {
            // Se o usuário não estiver logado, exibe o componente UsePromptLogin
            setShowPrompt(true);
        }
    }, [token, userName]);

    // Retornar algo se necessário, por exemplo, null ou um componente padrão
    return showPrompt ? <UsePromptLogin /> : null;
}