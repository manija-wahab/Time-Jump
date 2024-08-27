/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('habit', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('count').defaultTo(0).notNullable()
    table.integer('goal').defaultTo(100).notNullable()
    table.check('goal >= count')
    table.string('color').notNullable().defaultTo('#ffffff')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('habit')
}
