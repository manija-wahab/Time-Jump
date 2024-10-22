import connection from './connection.ts'
import { Memoir, NewMemoir } from '../../models/memoir.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllMemoirs(
  username: string,
  db = connection,
): Promise<Memoir[]> {
  return db('memoir')
    .where('username', username)
    .select('*')
    .orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewMemoir(
  memoir: NewMemoir & { username: string },
  db = connection,
): Promise<Memoir[]> {
  const [insertedId] = await db('memoir').insert(memoir, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editMemoir(
  id: number,
  username: string,
  updatedMemoir: Partial<Memoir>,
  db = connection,
): Promise<Memoir[]> {
  await db('memoir').where({ id, username }).update(updatedMemoir)
  return db('memoir').where({ id, username }).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteMemoir(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('memoir').where({ id, username }).del()
}
