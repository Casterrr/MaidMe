
exports.up = function(knex) {
  return knex.schema.createTable('housekeepers', function(table) {

    table.string('id').primary();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('gender').notNullable();
    table.integer('age').notNullable();
    table.string('city').notNullable();
    table.string('whatsapp').notNullable();
    table.string('email').notNullable();
    table.string('description').notNullable();
    table.string('profile_pic').notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('housekeepers');
};
