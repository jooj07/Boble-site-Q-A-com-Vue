const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.config.validation;

  const encryptPassword = (senha) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  };

  const saveUser = async (req, res) => {
    const user = { ...req.body };
    if (req.params.iduser) user.iduser = req.params.iduser;

    try {
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

    user.senha = encryptPassword(user.senha);
    delete user.confirmaSenha;
    
    user.adm = false
    
    app
      .db("users")
      .insert(user)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  return { saveUser };
};
