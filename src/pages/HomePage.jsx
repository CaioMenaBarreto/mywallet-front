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
import { useEffect } from "react"
import axios from "axios"
import UsePromptLogin from "../components/usePrompt"

export default function HomePage() {
  const { userName, token } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(undefined);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const showLoginPrompt = () => {
    setShowLoginModal(true);
  };

  useQuickOut(showLoginPrompt);
  const logout = useLogout();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/transactions`, config)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response.data));
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        <ul>
          <TransactionItem />
          <TransactionItem />
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
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
  margin-top: 5px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 10px;
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
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const Span = styled.span`
    color: #c6c6c6;
    right: 35px;
    position: absolute;
`;