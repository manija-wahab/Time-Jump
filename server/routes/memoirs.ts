import { Router } from 'express'
import { NewMemoir } from '../../models/memoir.ts'
import * as db from '../db/memoirs.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/', async (req, res) => {
  try {
    const username = req.query.username as string
    const memoirs = await db.getAllMemoirs(username)
    res.json(memoirs)
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
    const username = req.body.username
    const content = req.body
    const newMemoir = await db.addNewMemoir({ ...content, username })
    res.json(newMemoir)
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
    const username = req.body.username
    const { content } = req.body
    const editedMemoir: Partial<NewMemoir> = {
      content,
      username,
    }
    const updatedMemoir = await db.editMemoir(id, username, editedMemoir)
    res.json(updatedMemoir)
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
    await db.deleteMemoir(id, username)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
