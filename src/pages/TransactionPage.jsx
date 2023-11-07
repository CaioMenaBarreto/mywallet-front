import styled from "styled-components";
import { useQuickOut } from "../hooks/useQuickOut"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UsePromptLogin from "../components/usePrompt";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const showLoginPrompt = () => {
    setShowLoginModal(true);
  };

  useQuickOut(showLoginPrompt);

  return (
    <TransactionsContainer>
      <h1>Nova Transação</h1>
      <form>
        <input placeholder="Valor" type="text" />
        <input placeholder="Descrição" type="text" />
        <button>Salvar Transação</button>
      </form>

      {showLoginModal && (
        <UsePromptLogin/>
      )}

    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    align-self: center;
    justify-self: flex-start;
    top: 150px;
    position: absolute;
  }
`
