import dayjs from "dayjs"
import styled from "styled-components"

export default function TransactionItem({transaction}) {
  const {date, description, value, type} = transaction
    return (
        <ItemContainer>
            <div>
                <span>{dayjs(date).format('DD/MM')}</span>
                <strong>{description}</strong>
            </div>
            <Value color={type}>{value.toString().replace('R$ ', '')}</Value>
            <Span>x</Span>
        </ItemContainer>
    )
}

const ItemContainer = styled.li`
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

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" ? "green" : "red")};
`

const Span = styled.span`
    color: #c6c6c6;
    right: 35px;
    position: absolute;
`;