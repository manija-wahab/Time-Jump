import { Router } from 'express'
import { NewCard } from '../../models/card.ts'

import * as db from '../db/cards.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/lifely', async (req, res) => {
  try {
    const cards = await db.getAllLifely()
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/yearly', async (req, res) => {
  try {
    const cards = await db.getAllYearly()
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/monthly', async (req, res) => {
  try {
    const cards = await db.getAllMonthly()
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/weekly', async (req, res) => {
  try {
    const cards = await db.getAllWeekly()
    res.json(cards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/daily', async (req, res) => {
  try {
    const cards = await db.getAllDaily()
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
    const { content } = req.body
    const newCard: NewCard = {
      content,
      inProgress: false,
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
    const { content } = req.body
    const newCard: NewCard = {
      content,
      inProgress: false,
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
    const { content } = req.body
    const newCard: NewCard = {
      content,
      inProgress: false,
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
    const { content } = req.body
    const newCard: NewCard = {
      content,
      inProgress: false,
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
    const { content } = req.body
    const newCard: NewCard = {
      content,
      inProgress: false,
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
    const { content, inProgress } = req.body
    const editedCard: NewCard = {
      content,
      inProgress,
    }
    const updatedCard = await db.editLifelyCard(id, editedCard)
    res.json(updatedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/yearly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, inProgress } = req.body
    const editedCard: NewCard = {
      content,
      inProgress,
    }
    const updatedCard = await db.editYearlyCard(id, editedCard)
    res.json(updatedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/monthly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, inProgress } = req.body
    const editedCard: NewCard = {
      content,
      inProgress,
    }
    const updatedCard = await db.editMonthlyCard(id, editedCard)
    res.json(updatedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
router.patch('/weekly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, inProgress } = req.body
    const editedCard: NewCard = {
      content,
      inProgress,
    }
    const updatedCard = await db.editWeeklyCard(id, editedCard)
    res.json(updatedCard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
router.patch('/daily/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { content, inProgress } = req.body
    const editedCard: NewCard = {
      content,
      inProgress,
    }
    const updatedCard = await db.editDailyCard(id, editedCard)
    res.json(updatedCard)
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
    await db.deleteLifelyCard(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/yearly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    await db.deleteYearlyCard(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/monthly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    await db.deleteMonthlyCard(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/weekly/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    await db.deleteWeeklyCard(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/daily/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    await db.deleteDailyCard(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
