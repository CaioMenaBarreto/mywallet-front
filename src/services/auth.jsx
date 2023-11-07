import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContexts";


export function useSignUp() {
    //Com o useNavigate criamos uma váriavel com a função de manipular as telas de acordo com os cliques e informações inseridas pelo usuário
    const navigate = useNavigate();
    return (body) => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/sign-up`, body)
            .then(res => navigate('/'))
            .catch(err => alert(err.response.data));
    }
}

export function useSignIn() {
    const navigate = useNavigate();
    const { setToken, setUserName } = useContext(AuthContext);

    return (body) => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/`, body)
            .then(res => {
                setToken(res.data.token);
                setUserName(res.data.userName)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userName', res.data.userName);
                navigate("/home");
            })
            .catch(error => alert(error.response.data));
    }
}

export function useLogout() {
    const { setToken, setUserName } = useContext(AuthContext);
    const navigate = useNavigate();

    return () => {
        setToken(undefined);
        setUserName(undefined);
        localStorage.clear();
        navigate('/');
    }
}