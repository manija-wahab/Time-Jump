/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('monthly').del()
  await knex('monthly').insert([
    { id: 1, content: 'content' },
    { id: 2, content: 'content' },
    { id: 3, content: 'content' },
    { id: 4, content: 'content' },
    { id: 5, content: 'content' },
    { id: 6, content: 'content' },
    { id: 7, content: 'content' },
    { id: 8, content: 'content' },
    { id: 9, content: 'content' },
    { id: 10, content: 'content' },
    { id: 11, content: 'content' },
    { id: 12, content: 'content' },
  ])
}
