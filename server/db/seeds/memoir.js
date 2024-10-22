/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('memoir').del()
  await knex('memoir').insert([
    {
      id: 1,
      content:
        'In the midst of battle, clarity emerges. The path of the warrior is to remain calm and unyielding.',
      username: 'defaultData',
    },
    {
      id: 2,
      content:
        'Today, I practiced the way of the sword. Each swing a testament to the discipline of the mind and body.',
    },
    {
      id: 3,
      content:
        'The way of strategy is not just in the form but in the spirit. One must see beyond the mere physical movements.',
    },
    {
      id: 4,
      content:
        'To understand the essence of combat, one must first master the art of silence and observation.',
    },
    {
      id: 5,
      content:
        'A true warrior’s strength lies not in the sword alone but in the wisdom that guides its path.',
    },
    {
      id: 6,
      content:
        'Today’s training was rigorous, but every drop of sweat and moment of exhaustion brings me closer to mastery.',
    },
    {
      id: 7,
      content:
        "The journey of a warrior is endless. Each day is an opportunity to refine one's skill and deepen one's understanding.",
    },
    {
      id: 8,
      content:
        'One must not only prepare for battle but also for the moments of peace. Both are integral to the path of the sword.',
    },
  ])
}
