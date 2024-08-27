import connection from './connection.ts'
import { Card, NewCard } from '../../models/card.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllLifely(db = connection): Promise<Card[]> {
  return db('lifely').select().orderBy('id', 'desc')
}

export async function getAllYearly(db = connection): Promise<Card[]> {
  return db('yearly').select().orderBy('id', 'desc')
}

export async function getAllMonthly(db = connection): Promise<Card[]> {
  return db('monthly').select().orderBy('id', 'desc')
}

export async function getAllWeekly(db = connection): Promise<Card[]> {
  return db('weekly').select().orderBy('id', 'desc')
}

export async function getAllDaily(db = connection): Promise<Card[]> {
  return db('daily').select().orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addLifelyCard(
  card: NewCard,
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('lifely').insert(card, ['*'])
  return insertedId
}

export async function addYearlyCard(
  card: NewCard,
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('yearly').insert(card, ['*'])
  return insertedId
}

export async function addMonthlyCard(
  card: NewCard,
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('monthly').insert(card, ['*'])
  return insertedId
}

export async function addWeeklyCard(
  card: NewCard,
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('weekly').insert(card, ['*'])
  return insertedId
}

export async function addDailyCard(
  card: NewCard,
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('daily').insert(card, ['*'])
  return insertedId
}

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

export async function editLifelyCard(
  id: number,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('lifely').where('id', id).update(updatedCard)
  return db('lifely').where('id', id).select()
}

export async function editYearlyCard(
  id: number,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('yearly').where('id', id).update(updatedCard)
  return db('yearly').where('id', id).select()
}

export async function editMonthlyCard(
  id: number,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('monthly').where('id', id).update(updatedCard)
  return db('monthly').where('id', id).select()
}

export async function editWeeklyCard(
  id: number,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('weekly').where('id', id).update(updatedCard)
  return db('weekly').where('id', id).select()
}

export async function editDailyCard(
  id: number,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('daily').where('id', id).update(updatedCard)
  return db('daily').where('id', id).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteLifelyCard(
  id: number,
  db = connection,
): Promise<void> {
  await db('lifely').where('id', id).del()
}

export async function deleteYearlyCard(
  id: number,
  db = connection,
): Promise<void> {
  await db('yearly').where('id', id).del()
}

export async function deleteMonthlyCard(
  id: number,
  db = connection,
): Promise<void> {
  await db('monthly').where('id', id).del()
}

export async function deleteWeeklyCard(
  id: number,
  db = connection,
): Promise<void> {
  await db('weekly').where('id', id).del()
}

export async function deleteDailyCard(
  id: number,
  db = connection,
): Promise<void> {
  await db('daily').where('id', id).del()
}
