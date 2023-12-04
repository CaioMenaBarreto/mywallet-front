// Importa a função useQuickOut do diretório de hooks
import useQuickOut from "../../hooks/useQuickOut"

// Importa os hooks useLocation e useParams do React Router para obter informações da URL
import { useLocation, useParams } from "react-router-dom"

// Importa o componente TransactionsContainer do diretório de estilos
import { TransactionsContainer } from "./styled"

// Importa o hook useForm do diretório de hooks
import useForm from "../../hooks/useForm"

// Importa o hook useEditTransaction do diretório de serviços
import { useEditTransaction } from "../../services/transactions"


// Componente funcional para a página de edição de transações
export default function EditTransactionsPage() {

  // Usa a função useQuickOut para verificar a autenticação do usuário
  useQuickOut()

  // Obtém o parâmetro 'type' da URL usando o hook useParams
  const { type } = useParams()
  
  // Obtém o estado passado por meio da navegação usando o hook useLocation
  const { state: { id, description, value, type: apiType } } = useLocation()
  
  // Usa o hook useForm para gerenciar o estado do formulário
  const { form, handleForm } = useForm({ description, value })
  
  // Determina o texto com base no tipo de transação
  const typeText = type === "entrada" ? "Entrada" : "Saída"

  //chamando função que realiza a edição dos dados
  const editTransaction = useEditTransaction()

  //função que acompanha a alteração do input e armazena o que está sendo digitado pelo usuário
  function submitForm(e) {
    e.preventDefault()

    // Chama a função de edição de transação com os dados do formulário e o ID da transação
    editTransaction(id, { ...form, type: apiType })
  }

  // Renderiza o componente da página de edição de transações
  return (
    <TransactionsContainer>
      <h1>Editar {typeText}</h1>
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
        <button type="submit">Atualizar {typeText}</button>
      </form>
    </TransactionsContainer>
  )
}