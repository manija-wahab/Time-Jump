/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('habit').del()
  await knex('habit').insert([
    {
      id: 1,
      name: 'Meditate',
      count: 100,
      goal: 365,
      color: '#ffffff',
      username: 'default',
    },
    {
      id: 2,
      name: 'Read',
      count: 25,
      goal: 100,
      color: '#329cff',
      username: 'default',
    },
    {
      id: 3,
      name: 'Exercise',
      count: 50,
      goal: 200,
      color: '#fff832',
      username: 'default',
    },
  ])
}
