// Importa o componente Link do React Router para navegação entre páginas
import { Link } from "react-router-dom";

// Importa o componente MyWalletLogo do diretório de componentes
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo";

// Importa o hook useQuickIn do diretório de hooks
import useQuickIn from "../../hooks/useQuickIn";

// Importa o hook useForm do diretório de hooks
import useForm from "../../hooks/useForm";

// Importa a função useLogin do diretório de serviços de autenticação
import { useLogin } from "../../services/auth";

// Importa o componente LoginContainer do diretório de estilos
import { LoginContainer } from "./styled";

// Importa o hook useState do React para gerenciar o estado do botão
import { useState } from "react";

// Importa o componente ThreeDots do pacote react-loader-spinner
import { ThreeDots } from 'react-loader-spinner';

// Componente funcional para a página de login
export default function LoginPage() {
  // Usa o hook useForm para gerenciar o estado do formulário
  const { form, handleForm } = useForm({ email: "", password: "" })
  
  // Estado para gerenciar o estado do botão de login
  const [handleButton, setHandleButton] = useState(false);
  
  // Usa a função useLogin para obter a função de login
  const login = useLogin()
  
  // Usa o hook useQuickIn para verificar a autenticação do usuário
  useQuickIn()

  // Função chamada ao submeter o formulário de login
  function submitForm(e) {
    e.preventDefault();
    
    // Ativa o estado do botão e realiza o login
    setHandleButton(true);
    login(form)
  };

  // Renderiza o componente da página de login
  return (
    <LoginContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
        />
        {handleButton ? (
          <button disabled={handleButton} type="submit">
            <ThreeDots type="ThreeDots" color="white" height={40} width={40} />
          </button>
        ) : (
          <button disabled={handleButton} type="submit">
            Entrar
          </button>
        )}
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </LoginContainer>
  )
}