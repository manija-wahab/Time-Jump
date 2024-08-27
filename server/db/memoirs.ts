import connection from './connection.ts'
import { Memoir, NewMemoir } from '../../models/memoir.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllMemoirs(db = connection): Promise<Memoir[]> {
  return db('memoir').select('*').orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewMemoir(
  memoir: NewMemoir,
  db = connection,
): Promise<NewMemoir[]> {
  const [insertedId] = await db('memoir').insert(memoir, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editMemoir(
  id: number,
  updatedMemoir: Partial<NewMemoir>,
  db = connection,
): Promise<Memoir[]> {
  await db('memoir').where('id', id).update(updatedMemoir)
  return db('memoir').where('id', id).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteMemoir(id: number, db = connection): Promise<void> {
  await db('memoir').where('id', id).del()
}
