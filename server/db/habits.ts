import connection from './connection.ts'
import { Habit, NewHabit } from '../../models/habit.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllHabits(
  username: string,
  db = connection,
): Promise<Habit[]> {
  return db('habit')
    .where('username', username)
    .select('*')
    .orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewHabit(
  habit: NewHabit & { username: string },
  db = connection,
): Promise<Habit[]> {
  const [insertedId] = await db('habit').insert(habit, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editHabit(
  id: number,
  username: string,
  updatedHabit: Partial<NewHabit>,
  db = connection,
): Promise<Habit[]> {
  await db('habit').where({ id, username }).update(updatedHabit)
  return db('habit').where({ id, username }).select()
}

export async function incrementHabitCount(
  id: number,
  username: string,
  db = connection,
): Promise<Habit[]> {
  console.log('Incrementing habit for id:', id, 'and username:', username)
  await db('habit').where({ id, username }).increment('count', 1)
  return db('habit').where({ id, username }).select()
}

export async function decrementHabitCount(
  id: number,
  username: string,
  db = connection,
): Promise<Habit[]> {
  console.log('Decrementing habit for id:', id, 'and username:', username)
  await db('habit').where({ id, username }).decrement('count', 1)
  return db('habit').where({ id, username }).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteHabit(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('habit').where({ id, username }).del()
}
