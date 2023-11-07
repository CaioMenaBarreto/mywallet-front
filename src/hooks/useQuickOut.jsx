import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContexts";

export function useQuickOut(callback = null) {
    const { userName, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !userName) {
            if (callback) {
                callback();
            } else {
                navigate('/');
            }
        }
    }, []);
}