/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('yearly', (table) => {
    table.increments('id').primary()
    table.string('content')
    table.string('username').notNullable()
    table.foreign('username').references('username').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('yearly')
}
