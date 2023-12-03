import { Value, ItemContainer, RightContainer } from "./styled"
import dayjs from "dayjs"
import { IoMdClose } from "react-icons/io"
import { useDeleteTransaction } from "../../services/transactions"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function TransactionItem({ transaction, getTransactions }) {
  const { id, date, description, value, type } = transaction
  const deleteTransaction = useDeleteTransaction()
  const navigate = useNavigate()

  function onClickDelete() {
    const confirmDelete = Swal.fire({
      title: `Você tem certeza que deseja deletar ${description}?`,
      text: 'Essa ação não pode ser desfeita.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Sua transação foi deletada.');
      }
      deleteTransaction(id, getTransactions)
    })
  }

  function onClickEdit() {
    navigate(
      `/editar-transacao/${type === "expense" ? "saida" : "entrada"}`,
      { state: transaction }
    )
  }

  return (
    <ItemContainer>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
        <strong onClick={onClickEdit}>{description}</strong>
      </div>
      <RightContainer>
        <Value color={type}>{value.toString().replace(".", ",")}</Value>
        <IoMdClose onClick={onClickDelete} />
      </RightContainer>
    </ItemContainer>
  )
}

