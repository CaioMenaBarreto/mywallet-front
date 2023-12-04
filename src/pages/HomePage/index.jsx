// Importa ícones do React para serem utilizados no componente
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

// Importa o hook useQuickOut do diretório de hooks
import useQuickOut from "../../hooks/useQuickOut";

// Importa o hook useContext do React para acessar o contexto de autenticação
import { useContext } from "react";

// Importa o contexto de autenticação
import AuthContext from "../../contexts/AuthContext";

// Importa a função useLogout do diretório de serviços de autenticação
import { useLogout } from "../../services/auth";

// Importa o componente TransactionItem do diretório de componentes
import TransactionItem from "../../components/TransactionItem/TransactionItem";

// Importa o componente Oval do pacote react-loader-spinner
import { Oval } from "react-loader-spinner";

// Importa o hook useGetTransactions do diretório de serviços de transações
import { useGetTransactions } from "../../services/transactions";

// Importa o hook useNavigate do React Router para navegação programática
import { useNavigate } from "react-router-dom";

// Importa os estilos do componente
import { HomeContainer, Header, TransactionsContainer, ListContainer, Value, ButtonsContainer } from "./styled";

// Importa cores principais do diretório de constantes
import { mainColor, mainColorLight } from "../../constants/colors";


// Componente funcional para a página inicial
export default function HomePage() {
  // Obtém o userName do contexto de autenticação
  const { userName } = useContext(AuthContext);

  // Utiliza o hook useNavigate para navegação programática
  const navigate = useNavigate();

  // Utiliza a função useLogout para obter a função de logout
  const logout = useLogout();

  // Utiliza o hook useGetTransactions para obter o estado das transações
  const { transactions, getTransactions } = useGetTransactions();

  // Usa a função useQuickOut para verificar a autenticação do usuário
  const QuickOutComponent = useQuickOut();

  // Função para calcular o saldo do usuário com base nas transações
  function calcBalance() {
    const sum = transactions.reduce((acc, cur) => cur.type === "income" ? Number(acc) + Number(cur.value) : Number(acc) - Number(cur.value), 0)
    return Number(sum.toFixed(2));
  }

  // Verifica se as informações são verdadeiras e não são undefined, null ou length = 0
  const balance = transactions && calcBalance()

  // Renderiza o componente da página inicial
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