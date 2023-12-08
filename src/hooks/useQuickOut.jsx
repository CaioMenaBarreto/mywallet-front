import { useContext, useEffect, useState } from "react"

import AuthContext from "../contexts/AuthContext"

import UsePromptLogin from "../components/usePrompt";


export default function useQuickOut() {
    const { userName, token } = useContext(AuthContext);

    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        if (!token || !userName) {
            setShowPrompt(true);
        }
    }, [token, userName]);

    return showPrompt ? <UsePromptLogin /> : null;
}