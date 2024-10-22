/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('daily').del()

  await knex('users').insert({
    username: 'defaultUser',
    password: 'defaultPassword',
  })

  await knex('daily').insert([
    { id: 1, content: 'Perfect the art of the sword', username: 'defaultUser' },
    {
      id: 2,
      content: 'Meditate in solitude for clarity',
      username: 'defaultUser',
    },
    { id: 3, content: 'Study the nature of combat', username: 'defaultUser' },
  ])
}
