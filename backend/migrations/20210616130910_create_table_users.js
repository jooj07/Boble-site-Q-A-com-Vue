exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("iduser").primary();
    table.string("nome").notNull();
    table.string("senha").notNull();
    table.string("email").notNull().unique();
    table.boolean("adm").notNull().defaultTo(false);
    table.timestamp("deletedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
