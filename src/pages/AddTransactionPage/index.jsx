// Importa a função useQuickOut do diretório de hooks
import useQuickOut from "../../hooks/useQuickOut"

// Importa o hook useParams do React Router para obter parâmetros da URL
import { useParams } from "react-router-dom"

// Importa o hook useForm do diretório de hooks
import useForm from "../../hooks/useForm"

// Importa o hook useAddTransaction do diretório de serviços
import { useAddTransaction } from "../../services/transactions"

// Importa o componente TransactionsContainer do diretório de estilos
import { TransactionsContainer } from "./styled"

// Componente funcional para a página de adição de transações
export default function AddTransactionsPage() {

  // Usa o hook useForm para gerenciar o estado do formulário
  const { form, handleForm } = useForm({ description: "", value: "" })

  // Obtém o parâmetro 'type' da URL usando o hook useParams
  const { type } = useParams()

  // Determina o texto com base no tipo de transação
  const typeText = type === "entrada" ? "Entrada" : "Saída"

  // Usa o hook useAddTransaction para obter a função de adição de transação
  const addTransaction = useAddTransaction()

  // Usa a função useQuickOut para verificar a autenticação do usuário e exibir um prompt de login se necessário
  const QuickOutComponent = useQuickOut();

  // Função chamada ao submeter o formulário
  function submitForm(e) {
    e.preventDefault()

    // Cria um objeto 'body' com os dados do formulário e o tipo de transação
    const body = { ...form, type: type === "entrada" ? "income" : "expense" }

    // Chama a função de adição de transação com o corpo do formulário
    addTransaction(body)
  }

  // Renderiza o componente da página de adição de transações
  return (
    <TransactionsContainer>
      {QuickOutComponent}
      <h1>Nova {typeText}</h1>
      <form onSubmit={submitForm}>
        <input
          required
          type="number"
          placeholder="Valor"
          name="value"
          value={form.value}
          onChange={handleForm}
        />
        <input
          required
          placeholder="Descrição"
          name="description"
          value={form.description}
          onChange={handleForm}
        />
        <button type="submit">Salvar {typeText}</button>
      </form>
    </TransactionsContainer>
  )
}