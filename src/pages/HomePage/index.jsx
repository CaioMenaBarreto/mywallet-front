import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import useQuickOut from "../../hooks/useQuickOut"
import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import { useLogout } from "../../services/auth"
import TransactionItem from "../../components/TransactionItem/TransactionItem"
import { Oval } from "react-loader-spinner"
import { useGetTransactions } from "../../services/transactions"
import { useNavigate } from "react-router-dom"
import { HomeContainer, Header, TransactionsContainer, ListContainer, Value, ButtonsContainer } from "./styled"
import { mainColor, mainColorLight } from "../../constants/colors"

export default function HomePage() {
  const { userName } = useContext(AuthContext)
  const navigate = useNavigate()
  const logout = useLogout()
  const { transactions, getTransactions } = useGetTransactions()
  //Chamando a função que verifica se o usuário está logado ou não
  const QuickOutComponent = useQuickOut();

  //Aqui estamos calculando o saldo do usuário
  function calcBalance() {
    const sum = transactions.reduce((acc, cur) => cur.type === "income" ? Number(acc) + Number(cur.value) : Number(acc) - Number(cur.value), 0)
    return Number(sum.toFixed(2));
  }
  //verificando se informações são verdadeiras e não são undefined, null ou length = 0
  const balance = transactions && calcBalance()

  return (
    <HomeContainer>
      {QuickOutComponent}
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        {!transactions && <Oval color={mainColor} secondaryColor={mainColorLight} />}
        {transactions && transactions.length === 0 && <>Não há registros de entrada ou saída</>}
        {transactions && transactions.length > 0 && (
          <ListContainer>
            <ul>
              {transactions.map((t) => <TransactionItem key={t._id} transaction={t} getTransactions={getTransactions} />)}
            </ul>
            <article>
              <strong>Saldo</strong>
              <Value color={balance > 0 ? "positivo" : "negativo"}>{Number(balance).toFixed(2).toString().replace(".", ",")}</Value>
            </article>
          </ListContainer>
        )}
      </TransactionsContainer>


      <ButtonsContainer>
        <div className="transaction-button" onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </div>
        <div className="transaction-button" onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </div>
      </ButtonsContainer>

    </HomeContainer>
  )
}