import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UsePromptLogin(){
    const navigate = useNavigate();

    return (
        <Modal>
          <ModalContent>
            <p>Realize o login para acessar a sua carteira</p>
            <button onClick={() => navigate('/')}>OK</button>
          </ModalContent>
        </Modal>
    )
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #8c11be;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 15%;
`;