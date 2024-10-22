import connection from './connection.ts'
import { User } from '../../models/users.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getUserByName(
  username: string,
  db = connection,
): Promise<User> {
  const user = await db('users').where({ username }).first()
  return user
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewUser(user: User, db = connection): Promise<User[]> {
  const [insertedId] = await db('users').insert(user, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

// export async function editTheme(
//   id: number,
//   updatedTheme: Partial<NewTheme>,
//   db = connection,
// ): Promise<Theme[]> {
//   await db('theme').where('id', id).update(updatedTheme)
//   return db('theme').where('id', id).select()
// }

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

// export async function deleteTheme(id: number, db = connection): Promise<void> {
//   await db('theme').where('id', id).del()
// }
