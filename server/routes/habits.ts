import { Router } from 'express'
import * as db from '../db/habits.ts'
import { NewHabit } from '../../models/habits.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/', async (req, res) => {
  try {
    const habits = await db.getAllHabits()
    res.json(habits)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

router.post('/', async (req, res) => {
  try {
    const content = req.body
    const newHabit = await db.addNewHabit(content)
    res.json(newHabit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { name, goal } = req.body
    const updatedHabit: Partial<NewHabit> = {
      name,
      goal,
    }
    const habit = await db.editHabit(id, updatedHabit)
    res.json(habit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id/increment', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const habit = await db.incrementHabitCount(id)
    res.json(habit[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id/decrement', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const habit = await db.decrementHabitCount(id)
    res.json(habit[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    await db.deleteHabit(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
