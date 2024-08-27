/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('daily').del()
  await knex('daily').insert([
    { id: 1, content: 'Perfect the art of the sword', inProgress: false },
    { id: 2, content: 'Meditate in solitude for clarity', inProgress: false },
    { id: 3, content: 'Study the nature of combat', inProgress: false },
    { id: 4, content: 'Sharpen both mind and blade', inProgress: false },
    { id: 5, content: 'Observe the movements of the wind', inProgress: false },
    {
      id: 6,
      content: 'Conquer fear and doubt within oneself',
      inProgress: false,
    },
    {
      id: 7,
      content: 'Seek out new challenges and opponents',
      inProgress: false,
    },
    { id: 8, content: 'Master the principles of strategy', inProgress: false },
    { id: 9, content: 'Reflect on past battles and learn', inProgress: false },
    {
      id: 10,
      content: 'Train rigorously under harsh conditions',
      inProgress: false,
    },
    {
      id: 11,
      content: 'Cultivate inner peace amidst chaos',
      inProgress: false,
    },
    {
      id: 12,
      content: 'Craft a philosophy for living and fighting',
      inProgress: false,
    },
  ])
}
