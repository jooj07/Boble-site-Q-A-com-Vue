exports.up = function (knex) {
  return knex.schema.createTable("respostas", (table) => {
    table.increments("idresposta").primary();
    table.string("titulo").notNull();
    table.binary("resposta").notNull();
    table
      .integer("idrespondeu")
      .notNull()
      .references("iduser")
      .inTable("users");
    table
      .integer("idpergunta")
      .notNull()
      .references("idpergunta")
      .inTable("perguntas");
    table.timestamp("dataresposta");
    table.timestamp("deletedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("respostas");
};
