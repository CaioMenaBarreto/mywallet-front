// Importa o componente Link do React Router para navegação entre páginas
import { Link } from "react-router-dom";

// Importa o componente MyWalletLogo do diretório de componentes
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo";

// Importa o hook useQuickIn do diretório de hooks
import useQuickIn from "../../hooks/useQuickIn";

// Importa o hook useForm do diretório de hooks
import useForm from "../../hooks/useForm";

// Importa a função useSignUp do diretório de serviços de autenticação
import { useSignUp } from "../../services/auth";

// Importa o componente SingUpContainer do diretório de estilos
import { SingUpContainer } from "./styled";

// Importa o pacote SweetAlert2 para exibição de alertas
import Swal from "sweetalert2";

// Importa o hook useState do React para gerenciar o estado do botão
import { useState } from "react";

// Importa o componente ThreeDots do pacote react-loader-spinner
import { ThreeDots } from "react-loader-spinner";

// Componente funcional para a página de cadastro
export default function SignUpPage() {
  // Usa o hook useForm para gerenciar o estado do formulário
  const { form, handleForm } = useForm({ name: "", email: "", password: "", confirmPassword: "" })
  
  // Usa o hook useQuickIn para verificar a autenticação do usuário
  useQuickIn()
  
  // Usa a função useSignUp para obter a função de cadastro
  const signUp = useSignUp();
  
  // Estado para gerenciar o estado do botão de cadastro
  const [handleButton, setHandleButton] = useState(false);

  // Função chamada ao submeter o formulário de cadastro
  function submitForm(e) {
    e.preventDefault()

    // Verifica se as senhas coincidem
    if (form.password !== form.confirmPassword) return Swal.fire({
      text: "As senhas não coincidem!"
    })
    
    // Remove o campo de confirmação de senha do objeto de dados antes de enviar
    delete form.confirmPassword

    // Ativa o estado do botão e realiza o cadastro
    setHandleButton(true);
    signUp(form)
  }

  // Renderiza o componente da página de cadastro
  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
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
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
        />
        {handleButton ? (
          <button disabled={handleButton} type="submit">
            <ThreeDots type="ThreeDots" color="white" height={40} width={40} />
          </button>
        ) : (
          <button disabled={handleButton} type="submit">
            Cadastrar
          </button>
        )}
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}