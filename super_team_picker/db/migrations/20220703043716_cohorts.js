/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cohorts', table => {
    table.increments('id'); // creates an auto-incrementing column 'id that is the same as SERIAL in SQL
    table.string('name');  //'title' column with VARCHAR(255)
    table.text('members');  // TEXT - larger VARCHAR
    table.string('logoUrl'); // view_count of type integer
    table.timestamp('created_at').defaultTo(knex.fn.now())  // created_at timestamp defaulted to the time of now, now being when the function is triggered e.g. new post created
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cohorts')
};
