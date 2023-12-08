import { Link } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo";
import useQuickIn from "../../hooks/useQuickIn";
import useForm from "../../hooks/useForm";
import { useSignUp } from "../../services/auth";
import { SingUpContainer } from "./styled";
import Swal from "sweetalert2";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const { form, handleForm } = useForm({ name: "", email: "", password: "", confirmPassword: "" })
  useQuickIn()
  const signUp = useSignUp();
  const [handleButton, setHandleButton] = useState(false);

  function submitForm(e) {
    e.preventDefault()

    if (form.password !== form.confirmPassword) return Swal.fire({
      text: "As senhas não coincidem!"
    })
    
    delete form.confirmPassword

    setHandleButton(true);
    signUp(form)
  }

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