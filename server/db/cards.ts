import connection from './connection.ts'
import { Card, NewCard } from '../../models/card.ts'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export async function getAllLifely(
  username: string,
  db = connection,
): Promise<Card[]> {
  return db('lifely').where('username', username).select().orderBy('id', 'desc')
}

export async function getAllYearly(
  username: string,
  db = connection,
): Promise<Card[]> {
  return db('yearly').where('username', username).select().orderBy('id', 'desc')
}

export async function getAllMonthly(
  username: string,
  db = connection,
): Promise<Card[]> {
  return db('monthly')
    .where('username', username)
    .select()
    .orderBy('id', 'desc')
}

export async function getAllWeekly(
  username: string,
  db = connection,
): Promise<Card[]> {
  return db('weekly').where('username', username).select().orderBy('id', 'desc')
}

export async function getAllDaily(
  username: string,
  db = connection,
): Promise<Card[]> {
  return db('daily').where('username', username).select().orderBy('id', 'desc')
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export async function addLifelyCard(
  card: NewCard & { username: string },
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('lifely').insert(card, ['*'])
  return insertedId
}

export async function addYearlyCard(
  card: NewCard & { username: string },
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('yearly').insert(card, ['*'])
  return insertedId
}

export async function addMonthlyCard(
  card: NewCard & { username: string },
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('monthly').insert(card, ['*'])
  return insertedId
}

export async function addWeeklyCard(
  card: NewCard & { username: string },
  db = connection,
): Promise<Card[]> {
  const [insertedId] = await db('weekly').insert(card, ['*'])
  return insertedId
}

export async function addDailyCard(
  card: NewCard & { username: string },
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
  username: string,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('lifely').where({ id, username }).update(updatedCard)
  return db('lifely').where({ id, username }).select()
}

export async function editYearlyCard(
  id: number,
  username: string,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('yearly').where({ id, username }).update(updatedCard)
  return db('yearly').where({ id, username }).select()
}

export async function editMonthlyCard(
  id: number,
  username: string,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('monthly').where({ id, username }).update(updatedCard)
  return db('monthly').where({ id, username }).select()
}

export async function editWeeklyCard(
  id: number,
  username: string,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('weekly').where({ id, username }).update(updatedCard)
  return db('weekly').where({ id, username }).select()
}

export async function editDailyCard(
  id: number,
  username: string,
  updatedCard: Partial<NewCard>,
  db = connection,
): Promise<Card[]> {
  await db('daily').where({ id, username }).update(updatedCard)
  return db('daily').where({ id, username }).select()
}

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

export async function deleteLifelyCard(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('lifely').where({ id, username }).del()
}

export async function deleteYearlyCard(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('yearly').where({ id, username }).del()
}

export async function deleteMonthlyCard(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('monthly').where({ id, username }).del()
}

export async function deleteWeeklyCard(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('weekly').where({ id, username }).del()
}

export async function deleteDailyCard(
  id: number,
  username: string,
  db = connection,
): Promise<void> {
  await db('daily').where({ id, username }).del()
}
