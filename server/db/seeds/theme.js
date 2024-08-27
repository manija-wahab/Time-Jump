/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('theme').del()
  await knex('theme').insert([
    {
      id: 1,
      image:
        'https://wallpapers-clan.com/wp-content/uploads/2023/12/one-piece-luffy-sun-god-nika-wallpaper-scaled.jpg',
      color: '#ff76d8',
    },
  ])
}
