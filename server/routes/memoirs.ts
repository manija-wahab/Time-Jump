import { Router } from 'express'
import { NewMemoir } from '../../models/memoir.ts'

import * as db from '../db/memoirs.ts'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

router.get('/', async (req, res) => {
  try {
    const memoirs = await db.getAllMemoirs()
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
    const content = req.body
    const newMemoir = await db.addNewMemoir(content)
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
    const { content, created_at } = req.body
    const editedMemoir: NewMemoir = {
      content,
      created_at,
    }
    const updatedMemoir = await db.editMemoir(id, editedMemoir)
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
    await db.deleteMemoir(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
