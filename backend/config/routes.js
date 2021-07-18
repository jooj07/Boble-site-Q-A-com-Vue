const admin = require("./admin.js");
module.exports = (app) => {
  //--------------sign----------------
  app.post("/signup", app.api.userSignup.saveUser);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  //---------------feed----------------

  app.route("/feed").get(app.api.perguntas.carregarPerguntas);

  app
    .route("/respostasPergunta/:id") //<- id da pergunta!
    .get(app.api.respostas.carregarRespostas);

  //-------------------respostas---------------
  app.route("/votar").put(app.api.respostas.votar);
  app
    .route("/novaResposta")
    .all(app.config.passport.authenticate())
    .post(app.api.respostas.novaResposta);

  app
    .route("/minhasRespostas/:id") //verificação no front
    .all(app.config.passport.authenticate())
    .get(app.api.respostas.minhasRespostas);

  app
    .route("/resposta/:id") //<- id da resposta!
    .all(app.config.passport.authenticate())
    .get(app.api.respostas.obterResposta);

  app
    .route("/editarResposta")  //verificação no front
    .all(app.config.passport.authenticate())
    .put(app.api.respostas.editarResposta);

  app
    .route("/apagarResposta/:id") //verificação no front
    .all(app.config.passport.authenticate())
    .delete(app.api.respostas.remover);

  app
    .route("/arquivoRespostas") //admin only
    .all(app.config.passport.authenticate())
    .get(admin(app.api.respostas.carregarArquivo));

  //----------------perguntas-----------
  app.route("/pergunta/:id").get(app.api.perguntas.obterPergunta);

  app
    .route("/minhasPerguntas/:id") //verificação no front
    .all(app.config.passport.authenticate())
    .get(app.api.perguntas.minhasPerguntas);

  app
    .route("/novaPergunta")
    .all(app.config.passport.authenticate())
    .post(app.api.perguntas.novaPergunta);

  app
    .route("/editarPergunta")  //verificação no front
    .all(app.config.passport.authenticate())
    .put(app.api.perguntas.editarPergunta);

  app
    .route("/fecharPergunta/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.perguntas.respondida);

  app
    .route("/apagarPergunta/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.perguntas.remover);

  app
    .route("/arquivoPerguntas") //admin only
    .all(app.config.passport.authenticate())
    .get(admin(app.api.perguntas.carregarArquivo));

  //----------------stats-adm-only-----------
  app
    .route("/statsAtivos")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.usuariosAtivos));
  app
    .route("/statsUsers")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.usuarios));
  app
    .route("/statsPerguntas")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.perguntas));
  app
    .route("/statsRespondidas")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.perguntasRepondidas));
  app
    .route("/statsAbertas")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.perguntasAbertas));
  app
    .route("/statsRespostas")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.estatisticas.respostas));
  //--------------users-management-adm-only-----------
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save)) 
    .get(admin(app.api.user.getUsers4Adm)); 

  app
    .route("/users/:iduser")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove));
  app
    .route("/admUserWipe/:iduser")
    .all(app.config.passport.authenticate())
    .delete(admin(app.api.user.removeWithAll));
  app
    .route("/editarPerfil/:iduser") //verificação no front
    .all(app.config.passport.authenticate())
    .put(app.api.user.save) 
    .get(app.api.user.getSelf)
    .delete(app.api.user.remove);
  
  // app
  //   .route("/rotateste") //verificação no front
  //   .get(app.api.respostas.carregarArquivo2)

  };
