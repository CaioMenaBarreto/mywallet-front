import useQuickOut from "../../hooks/useQuickOut"
import { useLocation, useParams } from "react-router-dom"
import { TransactionsContainer } from "./styled"
import useForm from "../../hooks/useForm"
import { useEditTransaction } from "../../services/transactions"

export default function EditTransactionsPage() {
  useQuickOut()
  const { type } = useParams()
  const { state: { _id, description, value, type: apiType } } = useLocation()
  const { form, handleForm } = useForm({ description, value })
  const typeText = type === "entrada" ? "Entrada" : "Saída"
  //chamando função que realiza a edição dos dados
  const editTransaction = useEditTransaction()

  //função que acompanha a alteração do input e armazena o que está sendo digitado pelo usuário
  function submitForm(e) {
    e.preventDefault()
    editTransaction(_id, { ...form, type: apiType })
  }

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