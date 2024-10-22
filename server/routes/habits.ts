import { Router } from 'express'
import * as db from '../db/habits.ts'
import { NewHabit } from '../../models/habit.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/', async (req, res) => {
  try {
    const username = req.query.username as string
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    const habits = await db.getAllHabits(username)
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
    const { username, name, goal, color } = req.body

    const newHabit: NewHabit = { username, name, goal, color }
    const addedHabit = await db.addNewHabit(newHabit)
    res.json(addedHabit)
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
    const { username, name, goal } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    const updatedHabit: Partial<NewHabit> = { name, goal }
    const habit = await db.editHabit(id, username, updatedHabit)
    res.json(habit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id/increment', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    const habit = await db.incrementHabitCount(id, username)
    res.json(habit[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id/decrement', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { username } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    const habit = await db.decrementHabitCount(id, username)
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
    const { username } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    await db.deleteHabit(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
