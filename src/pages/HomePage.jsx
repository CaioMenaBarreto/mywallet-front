import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext } from "react"
import AuthContext from "../contexts/authContexts"
import { useQuickOut } from "../hooks/useQuickOut"
import { useLogout } from "../services/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TransactionItem from "../components/TransactionItem"
import UsePromptLogin from "../components/usePrompt"
import { Oval } from "react-loader-spinner"
import { useGetTransactions } from "../services/transactions"

export default function HomePage() {
  const { userName } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const transactions = useGetTransactions();

  const showLoginPrompt = () => {
    setShowLoginModal(true);
  };

  useQuickOut(showLoginPrompt);
  const logout = useLogout();

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        {!transactions && <Oval color='#8c11be ' width={100} height={100} />
        }
        {transactions && transactions.length === 0 && <>Não há registros de entrada ou saída</>}


        {transactions && transactions.length > 0 && (
          <ListContainer>
            <ul>
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </ul>
            <article>
              <strong>Saldo</strong>
              <Value color={"positivo"}>2880,00</Value>
            </article>
          </ListContainer>
        )}

      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

      {showLoginModal && (
        <UsePromptLogin />
      )}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 10px;
  margin-top: 7px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  height: 0px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c6c6c6;
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`

const ListContainer = styled.article`
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  padding: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    overflow-y: auto;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  article {
    display: flex;
    justify-content: space-between;   
    padding-top: 10px;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`