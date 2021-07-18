module.exports = (app) => {
  const usuariosAtivos = async (req, res) => {
    await app
      .db("users")
      .count("iduser")
      .whereNull("deletedAt")
      .first()
      .then((usuariosAtivos) => {
        usuariosAtivos = { "Usuários ativos": usuariosAtivos.count };
        return res.json(usuariosAtivos);
      })
      .catch((err) => res.status(500).send(err));
  };
  const usuarios = async (req, res) => {
    await app
      .db("users")
      .count("iduser")
      .first()
      .then((usuarios) => {
        usuarios = { "Usuários totais (conta excluídos)": usuarios.count };
        return res.json(usuarios);
      })
      .catch((err) => res.status(500).send(err));
  };

  const perguntas = async (req, res) => {
    await app
      .db("perguntas")
      .count("idpergunta")
      .first()
      .then((perguntas) => {
        perguntas = { "Perguntas": perguntas.count };
        return res.json(perguntas);
      })
      .catch((err) => res.status(500).send(err));
  };

  const respostas = async (req, res) => {
    await app
      .db("respostas")
      .count("idresposta")
      .first()
      .then((respostas) => {
        respostas = { "Respostas": respostas.count };
        return res.json(respostas);
      })
      .catch((err) => res.status(500).send(err));
  };

  const perguntasRepondidas = async (req, res) => {
    await app
      .db("perguntas")
      .count("idpergunta")
      .where({ respondida: true })
      .first()
      .then((perguntasRepondidas) => {
        perguntasRepondidas = {
          "Perguntas respondidas": perguntasRepondidas.count,
        };
        return res.json(perguntasRepondidas);
      })
      .catch((err) => res.status(500).send(err));
  };

  const perguntasAbertas = async (req, res) => {
    await app
      .db("perguntas")
      .count("idpergunta")
      .where({ respondida: false })
      .first()
      .then((perguntasAbertas) => {
        perguntasAbertas = {
          "Perguntas abertas": perguntasAbertas.count,
        };
        return res.json(perguntasAbertas);
      })
      .catch((err) => res.status(500).send(err));
  };

  return {
    usuariosAtivos,
    usuarios,
    perguntas,
    respostas,
    perguntasRepondidas,
    perguntasAbertas,
  };
};
