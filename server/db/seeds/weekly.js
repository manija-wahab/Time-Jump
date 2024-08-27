/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('weekly').del()
  await knex('weekly').insert([
    { id: 1, content: 'content', inProgress: false },
    { id: 2, content: 'content', inProgress: false },
    { id: 3, content: 'content', inProgress: false },
    { id: 4, content: 'content', inProgress: false },
    { id: 5, content: 'content', inProgress: false },
    { id: 6, content: 'content', inProgress: false },
    { id: 7, content: 'content', inProgress: false },
    { id: 8, content: 'content', inProgress: false },
    { id: 9, content: 'content', inProgress: false },
    { id: 10, content: 'content', inProgress: false },
    { id: 11, content: 'content', inProgress: false },
    { id: 12, content: 'content', inProgress: false },
  ])
}
