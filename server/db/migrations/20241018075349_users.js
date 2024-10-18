/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('eartho_id').notNullable()
    table.string('email').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knt5ex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  return knex.schema.dropTableIfExists('users')
}
