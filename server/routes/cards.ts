import { Router } from 'express'
import { NewCard } from '../../models/card.ts'
import * as db from '../db/cards.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/lifely', async (req, res) => {
  try {
    const { username } = req.query
    const cards = await db.getAllLifely(username as string)
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/yearly', async (req, res) => {
  try {
    const { username } = req.query
    const cards = await db.getAllYearly(username as string)
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/monthly', async (req, res) => {
  try {
    const { username } = req.query
    const cards = await db.getAllMonthly(username as string)
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/weekly', async (req, res) => {
  try {
    const { username } = req.query
    const cards = await db.getAllWeekly(username as string)
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/daily', async (req, res) => {
  try {
    const { username } = req.query
    const cards = await db.getAllDaily(username as string)
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

router.post('/lifely', async (req, res) => {
  try {
    const { content, username } = req.body
    const newCard: NewCard = {
      content,
      username,
    }
    const insertedCard = await db.addLifelyCard(newCard)
    res.json(insertedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/yearly', async (req, res) => {
  try {
    const { content, username } = req.body
    const newCard: NewCard = {
      content,
      username,
    }
    const insertedCard = await db.addYearlyCard(newCard)
    res.json(insertedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/monthly', async (req, res) => {
  try {
    const { content, username } = req.body
    const newCard: NewCard = {
      content,
      username,
    }
    const insertedCard = await db.addMonthlyCard(newCard)
    res.json(insertedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/weekly', async (req, res) => {
  try {
    const { content, username } = req.body
    const newCard: NewCard = {
      content,
      username,
    }
    const insertedCard = await db.addWeeklyCard(newCard)
    res.json(insertedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/daily', async (req, res) => {
  try {
    const { content, username } = req.body
    const newCard: NewCard = {
      content,
      username,
    }
    const insertedCard = await db.addDailyCard(newCard)
    res.json(insertedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

router.patch('/lifely/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, username } = req.body
    const updatedCard: Partial<NewCard> = {
      content,
    }
    const updated = await db.editLifelyCard(id, username, updatedCard)
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Card not found or not authorized' })
    }
    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/yearly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, username } = req.body
    const updatedCard: Partial<NewCard> = {
      content,
    }
    const updated = await db.editYearlyCard(id, username, updatedCard)
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Card not found or not authorized' })
    }
    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/monthly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, username } = req.body
    const updatedCard: Partial<NewCard> = {
      content,
    }
    const updated = await db.editMonthlyCard(id, username, updatedCard)
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Card not found or not authorized' })
    }
    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/weekly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, username } = req.body
    const updatedCard: Partial<NewCard> = {
      content,
    }
    const updated = await db.editWeeklyCard(id, username, updatedCard)
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Card not found or not authorized' })
    }
    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/daily/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, username } = req.body
    const updatedCard: Partial<NewCard> = {
      content,
    }
    const updated = await db.editDailyCard(id, username, updatedCard)
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Card not found or not authorized' })
    }
    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

router.delete('/lifely/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    await db.deleteLifelyCard(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/yearly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    await db.deleteYearlyCard(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/monthly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    await db.deleteMonthlyCard(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/weekly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    await db.deleteWeeklyCard(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/daily/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    await db.deleteDailyCard(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
