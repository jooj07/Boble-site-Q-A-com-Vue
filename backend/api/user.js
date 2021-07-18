const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } =
    app.config.validation;
  const limit = 30;
  const encryptPassword = (senha) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.iduser) user.iduser = req.params.iduser;

    //se tiver um id ele vai validar apenas nome, email e se as senhas batem
    if (user.iduser) {
      try {
        existsOrError(user.nome, "Nome não informado");
        existsOrError(user.email, "E-mail não informado");
        equalsOrError(user.senha, user.confirmaSenha, "Senhas não conferem");

        const userFromDB = await app
          .db("users")
          .where({
            email: user.email,
          })
          .first();
        if (!user.iduser) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      } catch (msg) {
        return res.status(400).send(msg);
      }
    } else {
      try {
        //se Não tiver um id ele vai validar tudo
        existsOrError(user.nome, "Nome não informado");
        existsOrError(user.email, "E-mail não informado");
        existsOrError(user.senha, "Senha não informada");
        existsOrError(user.confirmaSenha, "Confirmação de Senha inválida");
        equalsOrError(user.senha, user.confirmaSenha, "Senhas não conferem");

        const userFromDB = await app
          .db("users")
          .where({ email: user.email })
          .first();
        if (!user.iduser) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      } catch (msg) {
        return res.status(400).send(msg);
      }
    }

    user.senha = encryptPassword(user.senha); //criptografa
    delete user.confirmaSenha;

    if (user.iduser && req.body.senha) {
      //se a tiver um id settado e a senha vier na requisição, ele atualiza tudo
      //estamos falando de atualizar
      app
        .db("users")
        .update(user)
        .where({ iduser: user.iduser })
        .whereNull("deletedAt")
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else if (user.iduser && !req.body.senha) {
      //se a tiver um id settado, mas não vier a senha, provavelmente o usuário
      //não quer alterar a senha, então ele atualiza apenas email, nome e estado admin;
      //estamos falando de atualizar
      app
        .db("users")
        .update({
          nome: user.nome,
          email: user.email,
          adm: user.adm,
        })
        .where({ iduser: user.iduser })
        .whereNull("deletedAt")
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else if (!user.iduser) {
      //se a tiver um id settado, não vier a senha, provavelmente o usuário não existe
      //então ai, criamos um.
      //estamos falando de inserir.
      app
        .db("users")
        .insert(user)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("users").count("iduser").first();
    const count = parseInt(result.count);
    app
      .db("users")
      .select("iduser", "nome", "email", "adm")
      .whereNull("deletedAt")
      .limit(limit)
      .offset(page * limit - limit)
      .then((users) => res.json({ data: users, count, limit }))
      .catch((err) => res.status(500).send(err));
  };
  const getUsers4Adm = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("users").count("iduser").first();
    const count = parseInt(result.count);
    app
      .db("users")
      .select("iduser", "nome", "email", "adm", "deletedAt")
      .limit(limit)
      .offset(page * limit - limit)
      .then((users) => res.json({ data: users, count, limit }))
      .catch((err) => res.status(500).send(err));
  };
  const getById = (req, res) => {
    app
      .db("users")
      .select("iduser", "nome", "email", "adm", "deletedAt")
      .where({ iduser: req.params.iduser })
      .first()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };
  const getSelf = (req, res) => {
    app
      .db("users")
      .select("iduser", "nome", "email")
      .where({ iduser: req.params.iduser })
      .whereNull("deletedAt")
      .first()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };
  //remove apenas o usuário
  const remove = async (req, res) => {
    try {
      const rowsDeletedUser = await app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ iduser: req.params.iduser });

      try {
        existsOrError(rowsDeletedUser, "Usuário não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };
   //remove o usuário e seu conteúdo
  const removeWithAll = async (req, res) => {
    try {
      await app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ iduser: req.params.iduser });
      await app
        .db("respostas")
        .update({ deletedAt: new Date() })
        .where({ idrespondeu: req.params.iduser });
      await app
        .db("perguntas")
        .update({ deletedAt: new Date() })
        .where({ idperguntou: req.params.iduser });
      console.log("passei aquu")
      return await res.status(204).send("Usuário e suas perguntas e respostas apagado com sucesso!");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };
  return {
    save,
    get,
    getById,
    remove,
    getSelf,
    getUsers4Adm,
    removeWithAll,
  };
};
