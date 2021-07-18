module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } =
    app.config.validation;

  const limit = 10; 
  const carregarPerguntas = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app.db("perguntas").count("idpergunta").first();
    const count = parseInt(result.count);

    app
      .db("users")
      .join("perguntas", "users.iduser", "=", "perguntas.idperguntou")
      .whereNull("perguntas.deletedAt")
      .whereNull("users.deletedAt")
      .select(
        "perguntas.idpergunta",
        "users.nome",
        "perguntas.titulo",
        "perguntas.pergunta",
        "perguntas.datapergunta",
        "perguntas.respondida"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((perguntas) => {
        perguntas.forEach((element) => {
          return (element.pergunta = element.pergunta.toString());
        });
        return res.json({ data: perguntas, count, limit });
      })
      .catch((err) => res.status(500).send(err));
  };
  const minhasPerguntas = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app
      .db("perguntas")
      .count("idpergunta")
      .where({ idperguntou: req.params.id })
      .whereNull("deletedAt")
      .first();
    const count = parseInt(result.count);

    app
      .db("users")
      .join("perguntas", "users.iduser", "=", "perguntas.idperguntou")
      .where({ "perguntas.idperguntou": req.params.id })
      .whereNull("perguntas.deletedAt")
      .whereNull("users.deletedAt")
      .select(
        "perguntas.idperguntou",
        "perguntas.idpergunta",
        "users.nome",
        "perguntas.titulo",
        "perguntas.pergunta",
        "perguntas.datapergunta",
        "perguntas.respondida"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((perguntas) => {
        perguntas.forEach((element) => {
          return (element.pergunta = element.pergunta.toString());
        });
        return res.json({ data: perguntas, count, limit });
      })
      .catch((err) => res.status(500).send(err));
  };
  const novaPergunta = (req, res) => {
    const pergunta = { ...req.body };
    try {
      existsOrError(pergunta.idperguntou, "Id não informado.");
      existsOrError(pergunta.titulo, "Titulo não informado.");
      existsOrError(pergunta.pergunta, "Corpo da pergunta não preenchido.");
      // existsOrError(pergunta.datapergunta, "Data não informada.");
    } catch (msg) {
      res.status(400).send(msg);
    }
    app
      .db("perguntas")
      .insert(pergunta)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  const respondida = (req, res) => {
    app
      .db("perguntas")
      .update({
        respondida: true,
      })
      .where({ idpergunta: req.params.id })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const editarPergunta = (req, res) => {
    const pergunta = { ...req.body };
    try {
      existsOrError(pergunta.idpergunta, "Id não informado.");
      existsOrError(pergunta.titulo, "Titulo não informado.");
      existsOrError(pergunta.pergunta, "Corpo da pergunta não preenchido.");
      // existsOrError(pergunta.respondida, "Estado da pergunta não informado.");
      existsOrError(pergunta.datapergunta, "Data não informada.");
    } catch (msg) {
      res.status(400).send(msg);
    }
    app
      .db("perguntas")
      .update(pergunta)
      .where({ idpergunta: pergunta.idpergunta })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  const obterPergunta = (req, res) => {
    app
      .db("perguntas")
      .select(
        "idpergunta",
        "titulo",
        "pergunta",
        "idperguntou",
        "respondida",
        "datapergunta"
      )
      .where({ idpergunta: req.params.id })
      .whereNull("deletedAt")
      .first()
      .then((perguntas) => {
        perguntas.pergunta = perguntas.pergunta.toString();
        return res.json(perguntas);
      })
      .catch((err) => res.status(500).send(err));
  };
  const remover = async (req, res) => {
    try {
      const rowsDeletedUser = await app
        .db("perguntas")
        .update({ deletedAt: new Date() })
        .where({ idpergunta: req.params.id });

      try {
        existsOrError(rowsDeletedUser, "Pergunta não encontrada.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };
  const carregarArquivo = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app.db("perguntas").count("idpergunta").first();
    const count = parseInt(result.count);

    app
      .db("users")
      .join("perguntas", "users.iduser", "=", "perguntas.idperguntou")
      .select(
        "perguntas.idpergunta",
        "users.nome",
        "perguntas.titulo",
        "perguntas.pergunta",
        "perguntas.datapergunta",
        "perguntas.respondida",
        "perguntas.deletedAt"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((perguntas) => {
        perguntas.forEach((element) => {
          return (element.pergunta = element.pergunta.toString());
        });
        return res.json({ data: perguntas, count, limit });
      })
      .catch((err) => res.status(500).send(err));
  };

  return {
    novaPergunta,
    obterPergunta,
    editarPergunta,
    respondida,
    remover,
    carregarPerguntas,
    carregarArquivo,
    minhasPerguntas,
  };
};
