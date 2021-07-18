exports.up = function (knex, Promise) {
  return knex.schema.alterTable('respostas', table => {
      table.integer('votos')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('respostas', table => {
      table.dropColumn('votos')
  })
};
