import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import AddTransactionsPage from "./pages/AddTransactionPage"
import EditTransactionsPage from "./pages/EditTransactionPage"
import AuthContext from "./contexts/AuthContext"
import { useState } from "react"
import { mainColor } from "./constants/colors"

export default function App() {
  // Estado local para armazenar o token e o nome do usuário
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userName, setUserName] = useState(localStorage.getItem("userName"))

  return (
    <PagesContainer>
      {/* Fornecendo o contexto de autenticação para toda a aplicação */}
      <AuthContext.Provider value={{ token, setToken, userName, setUserName }}>
        <BrowserRouter>
          {/* Definindo as rotas da aplicação */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:type" element={<AddTransactionsPage />} />
            <Route path="/editar-transacao/:type" element={<EditTransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  )
}

// Estilização do componente principal
const PagesContainer = styled.main`
  background-color:  ${mainColor};
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
