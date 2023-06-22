# Cápsula do tempo

Este projeto é uma aplicação web e mobile desenvolvida como parte do evento NLW-Spacetime. É um aplicação de recordação de memórias, onde o usuário poderá adicionar à uma timeline textos, fotos e vídeos de acontecimentos marcantes da sua vida, organizados por mês e ano.

## Tabela de Conteúdos
<!--ts-->
* [Funcionalidades](#funcionalidades)
* [Como usar](#como-usar)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
  * [Executando a aplicação](#executando-a-aplicação)
* [Tecnologias](#tecnologias)
* [Autor](#autor)
<!--te-->

## Funcionalidades

- [x] Cadastrar usuário com conta GitHub
- [x] Cadastrar memória
- [x] Listar memórias
- [x] Editar memória
- [ ] Deletar memória
- [x] Upload de imagem na memória
- [ ] Upload de video na memória
- [ ] Rotas públicas
- [ ] Busca de usuário
- [ ] Listar memórias públicas

## Como usar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Instalação

Importante lembrar que o projeto está dividido em 3 partes:
- Web
- Mobile
- Server

```bash
# Clone este repositório
$ git clone https://github.com/BragaMPedro/NLW-Spacetime_Ignite

# Acesse a pasta do projeto no terminal/cmd
$ cd NLW-Spacetime_Ignite

# Para instalar o backend
$ cd server
$ npm install

# Para instalar o Web app
$ cd web
$ npm install

# Para instalar o Mobile app
$ cd server
$ npm install
```

### Executando a aplicação

```bash
# Execute o servidor
$ cd server
$ npm run dev

# Em seguida execute o app de sua preferência

# Para Web
$ cd web
$ npm start

# Para Mobile
$ cd mobile
$ npm start
```

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Web
- [Axios](https://axios-http.com/)
- [Lucide React](https://lucide.dev/)
- [Next.Js](https://nextjs.org/)
- [PostCSS](https://postcss.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Mobile
- [Axios](https://axios-http.com/)
- [Expo](https://expo.dev/)
- [Lucide React](https://lucide.dev/)
- [NativeWind](https://nativebase.io/)
- [React Native](https://reactnative.dev/)
- [ReactNavigation](https://reactnavigation.org/)

### Backend
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [SqLite](https://www.sqlite.org)

## Autor
<a href="https://www.linkedin.com/in/pedrobragaresume/">
   <img src="https://avatars.githubusercontent.com/u/111090976?v=4" width="100px;" style="border-radius: 50%;" alt=""/>
   <br />
   <sub><bPedro Braga</b></sub>
</a>

[![Linkedin Badge](https://img.shields.io/badge/-Pedro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=[https://www.linkedin.com/in/pedrobragaresume/)](https://www.linkedin.com/in/pedrobragaresume/)
