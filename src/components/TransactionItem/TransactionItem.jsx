import { Value, ItemContainer, RightContainer } from "./styled"
import dayjs from "dayjs"
import { IoMdClose } from "react-icons/io"
import { useDeleteTransaction } from "../../services/transactions"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function TransactionItem({ transaction, getTransactions }) {
  // Destruturação das propriedades da transação
  const { id, date, description, value, type } = transaction

  // Obtenção da função de exclusão de transação e navegação
  const deleteTransaction = useDeleteTransaction()
  const navigate = useNavigate()

  // Função chamada ao clicar no botão de exclusão
  function onClickDelete() {

    // Exibe um modal de confirmação usando Sweet Alert
    const confirmDelete = Swal.fire({
      title: `Você tem certeza que deseja deletar ${description}?`,
      text: 'Essa ação não pode ser desfeita.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      // Se o usuário confirmar, exibe uma mensagem e chama a função de exclusão
      if (result.isConfirmed) {
        Swal.fire('Sua transação foi deletada.');
        deleteTransaction(id, getTransactions)
      }
    })
  }

  // Função chamada ao clicar no botão de edição
  function onClickEdit() {
    // Navega para a página de edição com base no tipo de transação
    navigate(
      `/editar-transacao/${type === "expense" ? "saida" : "entrada"}`,
      { state: transaction }
    )
  }

  // Renderiza o componente da transação
  return (
    <ItemContainer>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
        <strong onClick={onClickEdit}>{description}</strong>
      </div>
      <RightContainer>
        <Value color={type}>{Number(value).toFixed(2).toString().replace(".", ",")}</Value>
        <IoMdClose onClick={onClickDelete} />
      </RightContainer>
    </ItemContainer>
  )
}

