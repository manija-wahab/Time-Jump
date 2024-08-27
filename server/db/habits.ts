import connection from './connection.ts'
import { Habit, NewHabit } from '../../models/habit.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllHabits(db = connection): Promise<Habit[]> {
  return db('habit').select('*').orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addNewHabit(
  habit: NewHabit,
  db = connection,
): Promise<NewHabit[]> {
  const [insertedId] = await db('habit').insert(habit, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editHabit(
  id: number,
  updatedHabit: Partial<NewHabit>,
  db = connection,
): Promise<Habit[]> {
  await db('habit').where('id', id).update(updatedHabit)
  return db('habit').where('id', id).select()
}

export async function incrementHabitCount(
  id: number,
  db = connection,
): Promise<Habit[]> {
  await db('habit').where('id', id).increment('count', 1)
  return db('habit').where('id', id).select()
}

export async function decrementHabitCount(
  id: number,
  db = connection,
): Promise<Habit[]> {
  await db('habit').where('id', id).decrement('count', 1)
  return db('habit').where('id', id)
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteHabit(id: number, db = connection): Promise<void> {
  await db('habit').where('id', id).del()
}
