exports.up = function (knex) {
  return knex.schema.createTable("perguntas", (table) => {
    table.increments("idpergunta").primary();
    table.string("titulo").notNull();
    table.binary("pergunta").notNull();
    table
      .integer("idperguntou")
      .notNull()
      .references("iduser")
      .inTable("users");
    table.boolean("respondida").notNull().defaultTo(false);
    table.timestamp("datapergunta");
    table.timestamp("deletedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("perguntas");
};
