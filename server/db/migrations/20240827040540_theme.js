/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('theme', (table) => {
    table.increments('id').primary()
    table.string('image').notNullable()
    table.string('color').notNullable()
    table.string('username').notNullable()
    table.foreign('username').references('username').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knt5ex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('theme')
}
