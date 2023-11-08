import { useContext } from "react";
import AuthContext from "../contexts/authContexts";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react"

export function useGetTransactions() {
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState(undefined);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions`, config)
            .then(res => {
                setTransactions(res.data);
            })
            .catch(err => console.error(err.response.data));
    }, [])

    return transactions;
}