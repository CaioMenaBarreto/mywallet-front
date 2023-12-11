# My Wallet

O My Wallet é a solução ideal para quem busca facilidade e controle nas finanças. Este projeto front-end permite adicionar, editar e deletar transações de forma intuitiva.

Com My Wallet, tenha sempre seu saldo atualizado com base nas transações realizadas. Uma interface amigável torna a gestão financeira simples, proporcionando uma visão clara e detalhada do seu estado financeiro.

<img src="https://github.com/CaioMenaBarreto/mywallet-front/blob/main/public/img-do-projeto.png" alt="">

# Demo
[Link do projeto](https://mywallet-ashy.vercel.app/)

# Como funciona?
Este projeto é um site projetado para proporcionar uma experiência intuitiva na visualização das transações pessoais do usuário. Sendo possível adicionar transações, editar e deletar de maneira intuitiva.

A interface única do site permite uma navegação eficiente e amigável. Ao clicar nos botões de adicionar entrada e adicionar saída você pode adicionar dados a respeito de transações financeiras na sua conta bancária.

Além disso, ao clicar no botão `X` localizado á direita de uma transação você pode deletar a transação em específico, deletando assim a transação selecionada e atualizando automaticamente o saldo atual do usuário.

Você pode também editar dados a respeito da transação financeira se clicar em cima da descrição da mesma. Ao clicar na descrição o usuário será redirecionado para uma tela em que é possível alterar os dados da transação.

# Rotas
Implementamos quatro rotas distintas:

- GET /transactions: Esta rota retorna todas as transações do usuário logado.

- POST /transactions: Já esta rota permite que o usuário crie uma nova transação seja uma nova entrada ou saída.

- PUT /transactions/:id : Esta rota permite ao usuário editar qualquer transação que ele desejar.

- DELETE /transactions/:id : Esta rota permite que o usuário delete qualquer trnasação que ele desejar.

# Tecnologias utilizadas
Para este projeto, foram utilizadas:
- Vite (versão ^5.0.0)
- React.js (versão ^18.2.0);
- JavaScript;
- HTML;
- Styled-components;
- Axios;
- Dayjs;
- Dotenv;
- Sweetalert2;
- React-Loader-Spinner;
- React-Icons.

# Como rodar em desenvolvimento
Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguinte propriedade:
```
VITE_REACT_APP_API_URL = https://mywalletapi-af8b.onrender.com 
```
- A propriedade VITE_REACT_APP_API_URL representa a URL base da My Wallet API, a qual você utilizará sempre que realizar uma requisição para obter informações a respeito de suas transações.
  
- Para iniciar o projeto em modo de desenvolvimento, utilize o comando `npm run dev`. Isso proporcionará a execução do ambiente de desenvolvimento, permitindo que você trabalhe e teste o projeto de forma eficiente.
