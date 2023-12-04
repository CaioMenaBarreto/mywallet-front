import { Link } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo"
import useQuickIn from "../../hooks/useQuickIn"
import useForm from "../../hooks/useForm"
import { useLogin } from "../../services/auth"
import { LoginContainer } from "./styled"
import { useState } from "react"
import { ThreeDots } from 'react-loader-spinner';

export default function LoginPage() {
  const { form, handleForm } = useForm({ email: "", password: "" })
  const [handleButton, setHandleButton] = useState(false);
  const login = useLogin()
  useQuickIn()

  function submitForm(e) {
    e.preventDefault()
    setHandleButton(true);
    login(form)
  };

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