# Projeto Gerenciador de Planilhas

## Descrição
Uma aplicação que auxilia na validação e manipulação de diversos tipos de planilhas de forma mais eficiente.

# Indice

* [Descrição](#descrição)
* [Como começar](#como-começar)
* [Funcionalidades e demonstração da aplicação](#funcionalidades-e-demonstração-da-aplicação)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Desenvolvedor](#desenvolvedor)

## Como Começar

1. Clone o repositório:
    ```bash
    git clone https://github.com/luisartur8/excel-react.git

2. Instale as dependências
    ```bash
    npm install
    ```

3. Para rodar o projeto:
    ```bash
    npm run dev
    ```

4. O projeto estará rodando em `http://localhost:5173`.

## Funcionalidades e demonstração da aplicação

1. É possível carregar e baixar planilhas com diferentes extensões (.xlsx, .xls, .csv, .ods).

2. Exportação de planilhas para o banco de dados.

3. Vários tipos de planilhas disponível (cliente, lançamentos, oportunidade, produtos).

4. Validação de diversos tipos de dados, para diferentes tipos de planilhas.

5. Formatar a planilha em um modelo padrão, de acordo com o tipo de planilha.

6. Manipulação de dados e da tabela:
    * Remoção de linhas e colunas de forma personalizada, assim como inserção de novas colunas.
    * Remoção de dados inválidos.
    * Localizar valores e substituir, podendo diferenciar maiúsculas e minúsculas, pesquisar por expressões regulares e corresponder toda célula.
    * Ordenar em ordem alfabética, auxiliando a indentificação de dados inválidos.
    * Juntar DDD e Telefone, informando o que deu errado.
    * É possível mesclar colunas com o mesmo tipo de dado.

<h2 align="center">Tecnologias Utilizadas</h2>

<h3 align="center">Front-End</h3>
<p align="center">
  <img src="https://skillicons.dev/icons?i=react&theme=light" alt="ReactJS" width="50" height="50">
  <br>ReactJS
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=vitest&theme=light" alt="Vitest" width="50" height="50">
  <br>Vitest
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs&theme=light" alt="NodeJS" width="50" height="50">
  <br>NodeJS
</p>

## Desenvolvedor
- ![github](https://skillicons.dev/icons?i=github&theme=light) @luisartur8

## Dica
- Se alguem quiser mexer na tabela, pegar os dados mais atuais de "dataRef" declarado em GereciadorSpreadsheet.jsx
- Pode mutar o dataRef diretamente se quiser, ou criar um clone [...dataRef.current] e depois atualizar a tabela usando dispatch(setData(dataRefClone))

## Conclusão

Este projeto tem como objetivo melhorar a eficiência em arrumar e validar tipos específicos de planilhas. Com isso, conseguimos aumentar a velocidade de correção das planilhas.

Embora já tenha implementado as funcionalidades principais, há muitos pontos de melhoria que podem ser adicionados, como a 
implementeação de testes automatizados, melhora no CSS e documentação do código.

**Próximos passos:**
- Atualizar o CSS.
- Criar mais testes automatizados e atualizar os atuais.
- Comentar o código novamente nessa nova versão do gerenciador.