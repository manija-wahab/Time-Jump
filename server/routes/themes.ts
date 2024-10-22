import { Router } from 'express'
import { NewTheme } from '../../models/theme.ts'
import * as db from '../db/themes.ts'

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
    const themes = await db.getAllThemes(username)
    res.json(themes)
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
    const { username, image, color } = req.body

    const newTheme: NewTheme = { username, image, color }
    const addedTheme = await db.addNewTheme(newTheme)
    res.json(addedTheme)
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
    const { username, image, color } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is required' })
    }

    const editedTheme: Partial<NewTheme> = { username, image, color }
    const updatedTheme = await db.editTheme(id, username, editedTheme)
    res.json(updatedTheme)
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

    await db.deleteTheme(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
