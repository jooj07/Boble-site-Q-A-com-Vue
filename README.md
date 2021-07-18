# Boblee: Criando um site de perguntas e respostas

## Back-end
![Alternate Text](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![Alternate Text](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![Alternate Text](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## front-end
![Alternate Text](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![Alternate Text](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![Alternate Text](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![Alternate Text](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)![Alternate Text](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

# Sobre

Um projeto que visa se assemelhar a plataformas de perguntas e respostas como Stack Overflow feito em Vue js, com painel administrativo.

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/modelagem_fake_yahoo_(1).png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/modelagem_fake_yahoo_(1).png)

modelagem em diagrama

## Um rápido panorama

- O usuário administrador tem acesso à todas as perguntas e respostas, e permissão de auditar todas as perguntas, respostas e usuários;
- Haverá um feed onde o usuário sem conta ou não logado pode apenas visualizar as perguntas e respostas
- Os usuários logados poderão realizar perguntas, apagar e editar as próprias perguntas, masrcar como respondida ou não, responder a outras questões e também votar as respostas de outros usuários;
- As perguntas deletadas, serão armazenadas na aba "perguntas arquivadas", visível apenas para os administradores;
- As perguntas, uma vez marcadas como respondidas, não poderão ser passíveis de interação.
- Perguntas respondidas podem ser deletadas, mas o sistema aconselhará o usuário a mantê-las para ajudar futuros outros usuários;
- Banco de dados: PostgresSQL;
- Backend: Node.js, Express, knex, JWT, Passport;
- Frontend: VueJS, Vuetify, Axios;

# Telas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled.png)

feed

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%201.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%201.png)

feed, tema claro

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%202.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%202.png)

página de uma pergunta

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%203.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%203.png)

admin dashboard - estatísticas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%204.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%204.png)

admin dashboard - usuários

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%205.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%205.png)

admin dashboard - usuários, filtrando por inatívos

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%206.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%206.png)

admin dashboard -usuários mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%207.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%207.png)

admin dashboard - estatísticas mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%208.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%208.png)

admin dashboard - gerenciar perguntas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%209.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%209.png)

admin dashboard - gerenciar perguntas mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2010.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2010.png)

admin dashboard - gerenciar respostas mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2011.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2011.png)

user dashboard - minhas respostas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2012.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2012.png)

user dashboard - minhas perguntas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2013.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2013.png)

user dashboard - editar perfil

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2014.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2014.png)

user dashboard - minhas respostas mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2015.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2015.png)

user dashboard - minhas perguntas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2016.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2016.png)

feed mobile

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2017.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2017.png)

user dashboard - editar perfil

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2018.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2018.png)

página de pergunta sem respostas ainda inseridas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2019.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2019.png)

página de perguntas com respostas

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2020.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2020.png)

caixa de resposta, tema escuro

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2021.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2021.png)

caixa de resposta, tema claro

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2022.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2022.png)

menu dropdown

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2023.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2023.png)

tela de login tema escuro

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2024.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2024.png)

tela de cadastre-se tema claro

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2025.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2025.png)

página de resposta sem estar logado

![Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2026.png](Boblee%20fake%20yahoo%20respostas%20ed322c76813844a9a7f04038359bc34c/Untitled%2026.png)

tela de erro 404

## O problema dos nomes repetidos nas tabelas do banco de dados

```jsx

const carregarArquivo2 = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app.db("respostas").count("idresposta").first();
    const count = parseInt(result.count);

    const respostas = await app
      .db("respostas")
      .join("perguntas", "perguntas.idpergunta", "=", "respostas.idpergunta")
      .select(
        "respostas.idrespondeu",
        "respostas.idpergunta",
        "respostas.idresposta",
        "respostas.titulo",
        "respostas.resposta",
        "respostas.dataresposta",
        "perguntas.datapergunta",
        "respostas.votos",
        "perguntas.pergunta",
        "respostas.deletedAt"
      )
      .limit(limit)
      .offset(page * limit - limit);
    respostas.forEach((element) => {
      return (element.pergunta = element.pergunta.toString());
    });
    respostas.forEach((element) => {
      return (element.resposta = element.resposta.toString());
    });
    await Promise.all(
      respostas.map(async (element) => {
        let users = await app
          .db("users")
          .select("iduser", "nome")
          .where({ iduser: element.idrespondeu });
        let payload = await Object.assign(element, ...users);
        return payload;
      }),
    );
    await Promise.all(respostas.map(async (element) => {
      let titulosPerguntas = await app
        .db("perguntas")
        .select("titulo")
        .where({ idpergunta: element.idpergunta })
        .first();
        const clone = titulosPerguntas
        const valorDesejado = clone["titulo"]
        delete clone["titulo"]
        clone["tituloPergunta"] = valorDesejado
      let payload = await Object.assign(element, clone);
      return await payload;
    }))
    return res.json({ data: respostas, count, limit });
  };
```