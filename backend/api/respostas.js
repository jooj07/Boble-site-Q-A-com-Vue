module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } =
    app.config.validation;
  const limit = 10; 
  const novaResposta = (req, res) => {
    const resposta = { ...req.body };
    try {
      existsOrError(resposta.resposta, "Corpo da resposta não preenchido.");
      existsOrError(resposta.dataresposta, "Data não informada.");
      existsOrError(resposta.idpergunta, "Você deve responder à uma pergunta.");
      existsOrError(resposta.idrespondeu, "usuário não informada.");
    } catch (msg) {
      res.status(400).send(msg);
    }
    app
      .db("respostas")
      .insert(resposta)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  const votar = (req, res) => {
    const resposta = { ...req.body };
    app
      .db("respostas")
      .update(resposta)
      .where({ idresposta: resposta.idresposta })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const carregarRespostas = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app
      .db("respostas")
      .count("idresposta")
      .where({ "respostas.idpergunta": req.params.id })
      .first();
    const count = parseInt(result.count);

    app
      .db("respostas")
      .join("perguntas", "perguntas.idpergunta", "=", "respostas.idpergunta")
      .join("users", "users.iduser", "=", "respostas.idrespondeu")
      .where({ "respostas.idpergunta": req.params.id })
      .whereNull("respostas.deletedAt")
      .whereNull("users.deletedAt")
      .select(
        "respostas.idpergunta",
        "respostas.idresposta",
        "users.nome",
        "respostas.titulo",
        "perguntas.pergunta",
        "respostas.resposta",
        "respostas.dataresposta",
        "perguntas.datapergunta",
        "respostas.votos"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((resp) => {
        resp.forEach((element) => {
          return (element.pergunta = element.pergunta.toString());
        });
        resp.forEach((element) => {
          return (element.resposta = element.resposta.toString());
        });

        return res.json({ data: resp, count, limit });
      })
      .catch((err) => res.status(500).send(err));
  };
  const minhasRespostas = async (req, res) => {
    const page = req.query.page || 1;
    const result = await app
      .db("respostas")
      .count("idresposta")
      .where({ idrespondeu: req.params.id })
      .whereNull("deletedAt")
      .first();
    const count = parseInt(result.count);

    app
      .db("respostas")
      .join("perguntas", "perguntas.idpergunta", "=", "respostas.idpergunta")
      .join("users", "users.iduser", "=", "respostas.idrespondeu")
      .where({ iduser: req.params.id })
      .whereNull("respostas.deletedAt")
      .select(
        "respostas.idpergunta",
        "respostas.idresposta",
        "respostas.idrespondeu",
        "users.nome",
        "perguntas.titulo",
        "perguntas.pergunta",
        "respostas.resposta",
        "respostas.dataresposta",
        "perguntas.datapergunta",
        "respostas.votos"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((respostas) => {
        respostas.forEach((element) => {
          return (element.pergunta = element.pergunta.toString());
        });
        respostas.forEach((element) => {
          return (element.resposta = element.resposta.toString());
        });
        return res.json({ data: respostas, count, limit });
      })
      .catch((err) => res.status(500).send(err));
  };
  const editarResposta = (req, res) => {
    const resposta = { ...req.body };
    try {
      existsOrError(resposta.idresposta, "Id não informado."); //tirar depois
      existsOrError(resposta.titulo, "Titulo não informado.");
      existsOrError(resposta.resposta, "Corpo da resposta não preenchido.");
      // existsOrError(resposta.dataresposta, "Data da resposta não preenchido.");
    } catch (msg) {
      res.status(400).send(msg);
    }
    app
      .db("respostas")
      .update(resposta)
      .where({ idresposta: resposta.idresposta })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  const obterResposta = (req, res) => {
    app
      .db("respostas")
      .join("users", "users.iduser", "=", "respostas.idrespondeu")
      .whereNull("respostas.deletedAt")
      .select(
        "users.nome",
        "idresposta",
        "titulo",
        "resposta",
        "idrespondeu",
        "idpergunta",
        "dataresposta"
      )
      .where({ idresposta: req.params.id })
      .first()
      .then((resposta) => {
        resposta.resposta = resposta.resposta.toString();
        return res.json(resposta);
      })
      .catch((err) => res.status(500).send(err));
  };
  const remover = async (req, res) => {
    try {
      const rowsDeletedUser = await app
        .db("respostas")
        .update({ deletedAt: new Date() })
        .where({ idresposta: req.params.id });

      try {
        existsOrError(rowsDeletedUser, "Resposta não encontrada.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };
  // const carregarArquivo = async (req, res) => {
  //   const page = req.query.page || 1;
  //   const result = await app.db("respostas").count("idresposta").first();
  //   const count = parseInt(result.count);

  //   const respostas = await app
  //     .db("respostas")
  //     .join("perguntas", "perguntas.idpergunta", "=", "respostas.idpergunta")
  //     .select(
  //       "respostas.idrespondeu",
  //       "respostas.idpergunta",
  //       "respostas.idresposta",
  //       "perguntas.titulo",
  //       "perguntas.pergunta",
  //       "respostas.resposta",
  //       "respostas.dataresposta",
  //       "perguntas.datapergunta",
  //       "respostas.votos",
  //       "respostas.deletedAt"
  //     )
  //     .limit(limit)
  //     .offset(page * limit - limit);
  //   respostas.forEach((element) => {
  //     return (element.pergunta = element.pergunta.toString());
  //   });
  //   respostas.forEach((element) => {
  //     return (element.resposta = element.resposta.toString());
  //   });
  //   await Promise.all(
  //     respostas.map(async (element) => {
  //       let users = await app
  //         .db("users")
  //         .select("iduser", "nome")
  //         .where({ iduser: element.idrespondeu });
  //       let payload = await Object.assign(element, ...users);
  //       return payload;
  //     })
  //   );

  //   return res.json({ data: respostas, count, limit });
  // };
  const carregarArquivo = async (req, res) => {
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
  return {
    novaResposta,
    carregarRespostas,
    editarResposta,
    obterResposta,
    remover,
    minhasRespostas,
    carregarArquivo,
    votar,
    
  };
};
