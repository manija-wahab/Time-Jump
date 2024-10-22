import { Router } from 'express'
// import { User } from '../../models/users.ts'
import knex from 'knex'
import * as db from '../db/users.ts'
import { DEFAULT_MEMOIRS } from '../db/defaultData.js'

const router = Router()

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

// router.get('/', async (req, res) => {
//   try {
//     const themes = await db.getAllThemes()
//     res.json(themes)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// })

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

router.post('/signUp', async (req, res) => {
  try {
    const userDetails = req.body

    // First, check if the username already exists
    const existingUser = await db.getUserByName(userDetails.username)
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' })
    }

    // Now add the new user
    const newUser = await db.addNewUser(userDetails)
    res.json(newUser)
  } catch (error) {
    console.error('Error during signUp:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await db.getUserByName(username)

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    if (user.password === password) {
      res.json({
        id: user.id,
        username: user.username,
        message: 'Login successful',
      })
    } else {
      res.status(401).json({ error: 'Invalid username or password' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Error logging in' })
  }
})

router.post('/default/memoirs', async (req, res) => {
  const { username } = req.body

  try {
    await Promise.all(
      DEFAULT_MEMOIRS.map(async (memoir) => {
        await knex('memoir').insert({
          content: memoir.content,
          username: username,
        })
      }),
    )
    res.status(201).json({ message: 'Default memoirs added successfully.' })
  } catch (error) {
    console.error('Error adding default memoirs:', error)
    res.status(500).json({ error: 'Failed to add default memoirs.' })
  }
})

// ╔══════════════════╗
// ║   Patch Routes   ║
// ╚══════════════════╝

// router.patch('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10)
//     const { image, color } = req.body
//     const editedTheme: NewTheme = {
//       image,
//       color,
//     }
//     const updatedTheme = await db.editTheme(id, editedTheme)
//     res.json(updatedTheme)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// })

// ╔═══════════════════╗
// ║   Delete Routes   ║
// ╚═══════════════════╝

// router.delete('/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10)
//     await db.deleteTheme(id)
//     res.status(204).send()
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// })

export default router
