import styled from "styled-components"

export default function TransactionItem() {
    return (
        <ItemContainer>
            <div>
                <span>30/11</span>
                <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
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
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`

const Span = styled.span`
    color: #c6c6c6;
    right: 35px;
    position: absolute;
`;