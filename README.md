# JumpCloud HROPS Integration

<h2>Dependências:</h2>
Para inicializar o projeto você precisará das seguintes ferramentas instaladas e configuradas:<br>
&nbsp&nbsp-node<br>
&nbsp&nbsp-npm<br>
&nbsp&nbsp-*Mysql Server<br>
&nbsp&nbsp-*Mysql Workbench<br>
    (No caso do mysql não precisam ser especificamente estas, você pode subir o banco de dados em um outro servidor de sua excolha)
<br><br>
Saiba Mais de como realizar as instalações em:<br>
    <h3>windows:</h3>
        https://nodejs.org/en/download/<br>
        https://dev.mysql.com/downloads/installer/<br>
<br>
    <h3>linux:</h3>
        https://nodejs.org/en/download/<br>
        sudo apt install nodejs<br>
        sudo apt install npm<br>
        sudo apt install mysql-server<br>
        sudo apt install mysql-workbench
<br><br>
<h2>Inicialização:</h2>
1. baixe os arquivos do git com o comando: git clone url_repositorio<br>
2. entre na pasta do projeto, abra o terminal e instale as dependencias através do comando 'npm install'<br>
3. crie uma base de dados no MySQL WorkBench<br>
&nbsp&nbsp 3.1 clique em + e adicione um nome a conexão<br>
&nbsp&nbsp 3.2 preencha o seu login de instalação e de ok<br>
&nbsp&nbsp 3.3 no canto esquerdo no painel "Schemas" clique com o botao direito e "create new schema"<br>
&nbsp&nbsp 3.4 escolha algum nome como "library_api_db" e clique em apply<br>
4. Edite o arquivo .env com os seus dados do MySQL WorkBench<br>
5. (optional) rode o comando "npm run seed" no terminal para inserir alguns registros no banco de dados<br>
6. rode o comando "npm run compile" para inicializar o projeto<br>
7. (optional) há também o comando "npm run test" para rodar os testes automatizados<br>
<br><br>


<h2>Considerações:</h2>
- Tempo de desenvolvimento: ~15h<br>
- na raiz do projeto há um arquivo "Insomnia.json" que pode ser importado no seu insomnia e importado para ter todas as rotas e comandos ja preenchidos, faciliando os testes<br>
- Ao finalizar o projeto me arrependi de utilizar a biblioteca "sequelize" pelo seu baixo nivel de suporte ao typescript, acredito que a melhor opção teria sido a "typeorm"<br>
