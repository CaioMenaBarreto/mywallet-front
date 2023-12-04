// Importa o hook useState da biblioteca React
import { useState } from "react"

// Função customizada para gerenciar o estado de um formulário
export default function useForm(initialForm) {
    // Utiliza o hook useState para criar o estado do formulário com o valor inicial fornecido
    const [form, setForm] = useState(initialForm)

    // Função para lidar com mudanças nos campos do formulário
    function handleForm(e) {
        // Atualiza o estado do formulário, preservando os valores anteriores e modificando apenas o campo alterado
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    // Retorna o estado atual do formulário e a função para lidar com alterações nos campos
    return { form, handleForm }
}