import connection from './connection.ts'
import { Theme, NewTheme } from '../../models/theme.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllThemes(
  username: string,
  db = connection,
): Promise<Theme[]> {
  return db('theme')
    .where('username', username)
    .select('*')
    .orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewTheme(
  theme: NewTheme & { username: string },
  db = connection,
): Promise<NewTheme[]> {
  const [insertedTheme] = await db('theme').insert(theme, ['*'])
  return insertedTheme
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editTheme(
  id: number,
  username: string,
  updatedTheme: Partial<NewTheme>,
  db = connection,
): Promise<Theme[]> {
  await db('theme').where({ id, username }).update(updatedTheme)
  return db('theme').where({ id, username }).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteTheme(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('theme').where({ id, username }).del()
}
