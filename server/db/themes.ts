import connection from './connection.ts'
import { Theme, NewTheme } from '../../models/theme.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllThemes(db = connection): Promise<Theme[]> {
  return db('theme').select('*').orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewTheme(
  theme: NewTheme,
  db = connection,
): Promise<NewTheme[]> {
  const [insertedId] = await db('theme').insert(theme, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editTheme(
  id: number,
  updatedTheme: Partial<NewTheme>,
  db = connection,
): Promise<Theme[]> {
  await db('theme').where('id', id).update(updatedTheme)
  return db('theme').where('id', id).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteTheme(id: number, db = connection): Promise<void> {
  await db('theme').where('id', id).del()
}
