# SIGS_BR (Backend)
SIGS_BR (Sistema Integrado de Gestão de Saúde para Baixa Renda) é um projeto de TCC composto por Patrick Marques, Lucas Feng, Vitor Chinaglia

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Configuração Inicial

Clone o repositório do projeto usando Git:

```bash
git clone https://github.com/Pmarques98/SIGS_BR.git
cd nome-do-projeto
```

Instale todas as dependências necessárias com Yarn:

```bash
yarn install
```

A conexão com o Banco de dados se deve com o Prisma, verifique os detalhes da conexão no arquivo schema.prisma

O projeto usa migrações para configurar o banco de dados, aplique-as com:

```bash
yarn prisma migrate deploy
```

Para executar o projeto, use:

```bash
yarn dev
```