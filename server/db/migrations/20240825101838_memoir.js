/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('memoir', (table) => {
    table.increments('id').primary()
    table.string('content')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username').notNullable()
    table.foreign('username').references('username').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('memoir')
}
